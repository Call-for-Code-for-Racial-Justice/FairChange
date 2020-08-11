import ibmCos from "ibm-cos-sdk";
import config from "configuration-master";
import fs from "fs";
import multer from 'multer';
import { AugmentedRequest } from "../routing/logging";
import { Response } from 'express';
import P from "pino";

const storage = multer.diskStorage({
	destination: function (req, file, cb)
	{
		cb(null, '/tmp/my-uploads');
	},
	filename: function (req, file, cb)
	{
		cb(null, `${file.fieldname}-${Date.now()}`);
	}
});

const upload = multer({
	storage: storage,
	limits: {
		fieldSize: 1024 * 1024 * 1024
	}
}).single('incidentVideo');

const getConfig = () =>
{
	return {
		endpoint: config.cloudObjectStorage.endpoint,
		apiKeyId: config.cloudObjectStorage.apikey,
		ibmAuthEndpoint: 'https://iam.ng.bluemix.net/oidc/token',
		serviceInstanceId: config.cloudObjectStorage.resource_instance_id,
		// these two are required to generate presigned URLs
		credentials: new ibmCos.Credentials({
			accessKeyId: config.cloudObjectStorage.cos_hmac_keys.access_key_id,
			secretAccessKey: config.cloudObjectStorage.cos_hmac_keys.secret_access_key
		}),
		signatureVersion: 'v4'
	};
};

export const getBuckets = async () =>
{
	const cos = new ibmCos.S3(config.cloudObjectStorage);

	return cos.listBuckets().promise().
		catch((e: any) =>
		{
			return { error: `ERROR: ${e.code} - ${e.message}\n` };
		});
};

export const multiPartUpload = async (itemName: string, filePath: string, logger: P.Logger): Promise<any> =>
{
	let uploadID: string | undefined = "";

	if (!fs.existsSync(filePath))
	{
		return Promise.reject(new Error(`The file '${filePath}' does not exist or is not accessible.`));
	}

	logger.info(`Starting multi-part upload for ${itemName} to bucket: ${config.cloudObjectStorage.bucketName}`);

	const cos = new ibmCos.S3(config.cloudObjectStorage);

	const data = await cos.createMultipartUpload({
		Bucket: config.cloudObjectStorage.bucketName,
		Key: itemName
	}).promise();

	uploadID = data.UploadId;

	return new Promise((resolve, reject) =>
	{
		//begin the file upload
		fs.readFile(filePath, async (e, fileData) =>
		{
			//min 5MB part
			const partSize = 1024 * 1024 * 5;
			const partCount = Math.ceil(fileData.length / partSize);

			const parts = new Array(partCount).fill(1);

			const uploads = parts.map((item, index) =>
			{
				const start = index * partSize;
				const end = Math.min(start + partSize, fileData.length);

				return cos.uploadPart({
					Body: fileData.slice(start, end),
					Bucket: config.cloudObjectStorage.bucketName,
					Key: itemName,
					PartNumber: index + 1,
					UploadId: uploadID as string
				}).promise();
			});

			const results = await Promise.all(uploads);

			const finalResults = results.map((item, index) =>
			{
				return { ETag: item.ETag, PartNumber: index + 1 };
			});

			const endResult = await cos.completeMultipartUpload({
				Bucket: config.cloudObjectStorage.bucketName,
				Key: itemName,
				MultipartUpload: {
					Parts: finalResults
				},
				UploadId: uploadID as string
			}).promise();

			logger.info(`Upload of all ${partCount} parts of ${itemName} successful.`);
			logger.debug({ endResult });

			resolve(endResult);
		});
	});
};

export const fileUpload = async (req: AugmentedRequest, res: Response): Promise<any> =>
{
	return new Promise((resolve, reject) =>
	{
		upload(req, res, async (err: any) =>
		{
			if (err)
			{
				reject(err);
			}

			const { file } = req;
			resolve(multiPartUpload(file.filename, file.path, req.log));
		});
	});
};


export const getUrl = async (key: string): Promise<string> =>
{
	const params = { Bucket: config.cloudObjectStorage.bucketName, Key: key, Expires: 60 };
	const cos = new ibmCos.S3(getConfig());

	return cos.getSignedUrlPromise('getObject', params);
};


// function cancelMultiPartUpload(bucketName, itemName, uploadID) {
//     return cos.abortMultipartUpload({
//         Bucket: bucketName,
//         Key: itemName,
//         UploadId: uploadID
//     }).promise()
//     .then(() => {
//         console.log(`Multi-part upload aborted for ${itemName}`);
//     })
//     .catch((e)=>{
//         console.error(`ERROR: ${e.code} - ${e.message}\n`);
//     });
// }

