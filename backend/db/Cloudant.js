import Cloudant from '@cloudant/cloudant';
// import { createViews, createIndexes } from '../cloudantModels/common';
import config from "configuration-master";
import { getLogger } from '../routing/logging';

const CONFLICT = 409;
const DATABASE_EXISTS = 412;
const TOO_MANY_REQUESTS = 429;
const INTERNAL_SERVER_ERROR = 500;
const NOT_IMPLEMENTED = 501;
const BAD_GATEWAY = 502;
const SERVICE_UNAVAILABLE = 503;
const GATEWAY_TIMEOUT = 504;

const RETRY_DELAY = 500;

const dbProps = {};
const logger = getLogger();
export const { dbName } = config.fairChangeDb;

const cloundantOptions = {
	url: config.fairChangeDb.url,
	plugins: [
		'promises',
		{
			iamauth: {
				iamApiKey: config.fairChangeDb.apikey
			}
		},
		{
			retry: {
				retryDelayMultiplier: 2,
				retryErrors: false,
				retryInitialDelayMsecs: RETRY_DELAY,
				retryStatusCodes: [
					TOO_MANY_REQUESTS,
					INTERNAL_SERVER_ERROR,
					NOT_IMPLEMENTED,
					BAD_GATEWAY,
					SERVICE_UNAVAILABLE,
					GATEWAY_TIMEOUT
				]
			}
		}

	]
};

const createDbAndUse = (inst, name) => new Promise((resolve, reject) =>
{
	inst.db.create(name).
		then(success =>
		{
			resolve(inst.db.use(name));
		}).
		catch(err =>
		{
			if ((err.statusCode === CONFLICT) || (err.statusCode === DATABASE_EXISTS))
			{
				// Already existsç
				resolve(inst.db.use(name));
			}
			else
			{
				reject(err);
			}
		});

});


export const CloudantUtil = async () =>
{
	const cloudant = Cloudant(cloundantOptions, async (err, instance) =>
	{
		if (err)
		{
			logger.error(err);
		}

		await createDbAndUse(instance, dbName);
	});

	dbProps.instance = cloudant;
	dbProps[dbName] = cloudant.db.use(dbName);
	// await createViews();
	// await createIndexes();
	return cloudant.db.use(dbName);
};

export const getDatabase = (name) =>
{
	return dbProps[name];
};

export const getInstance = () =>
{
	return dbProps.instance;
};
