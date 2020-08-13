import { Router, Request, Response, NextFunction } from "express";
import config from "configuration-master";
import { v4 as uuid } from "uuid";
import P, { default as Pino } from 'pino';

import https from "https";
import axios from "axios";
import omit from "lodash/omit";
import pick from "lodash/pick";
if (process.env.FC_CONFIG)
{
	config.setConfig(JSON.parse(`${process.env.FC_CONFIG}`));
}
else
{
	config.loadConfig("./configuration.json");
}

export interface AugmentedRequest extends Request {
	log: P.Logger,
	context?: { [key: string]: any }
}

export const router = Router();

const piiKeys: string[] = (config as { [key: string]: any }).logging.piiFilter.map((key: string) => key.toLowerCase());
export const getLogger = (children?: P.Bindings): P.Logger =>
{
	const baseLogger: P.Logger = Pino({
		redact: {
			paths: piiKeys,
			censor: (value: any) => { return "*".repeat(value.length); }
		},
		formatters: {
			level: (level, number) => ({ level })
		},
		messageKey: "message",
		level: ((config as { [key: string]: any }).logging.level as string).toLowerCase()
	});
	return children == null ? baseLogger.child({ id: "server generated log" }) : baseLogger.child(children);
};

export const preProcessRequest = (req: AugmentedRequest, res: Response, next: Function): void =>
{
	//use to specify CA if needed again in future
	const axiosInstance = (axios as { [key: string]: any }).create({
		// httpsAgent: new https.Agent({ ca: ca_bundle })
		httpsAgent: new https.Agent({
			rejectUnauthorized: false
		})
	});

	axiosInstance.interceptors.request.use((request: Request) =>
	{
		if (request.url.substring(request.url.length - 5) !== ".json")
		{
			req.log.trace({
				message: `request ${request.method}: ${request.url}`,
				request: omit(request, [
					"httpAgent",
					"httpsAgent"
				])
			});
		}
		return request;
	});
	axiosInstance.interceptors.response.use((response: any) =>
	{
		if (
			response.config.url.substring(response.config.url.length - 5) !== ".json"
		)
		{
			req.log.trace({
				message: `response ${response.config.method}: ${response.config.url}`,
				response: response.data
			});
		}
		return response;
	});

	req.context = { log: req.log, loader: axiosInstance };
};

const loggingSetup = (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	req.log = getLogger({ id: uuid() });

	req.log.debug({ message: "incoming request",
		request: pick(req, [
			"httpVersion",
			"headers",
			"trailers",
			"url",
			"method",
			"baseUrl",
			"originalUrl",
			"params",
			"query",
			"body"
		])
	});

	preProcessRequest(req, res, next);

	next();
	res.on("finish", () =>
	{
		req.log = null!;
		req.context = null!;
	});
};

// @ts-ignore don't know how to cast from Application to AugmentedRequest in typescript
router.use("/", loggingSetup);
