import { Router, Request, Response, NextFunction } from "express";
import { Incident, storeIncident, getIncident, linkVideo, getIncidents } from '../models/incident';
import { AugmentedRequest } from "./logging";
import { getBuckets, getUrl, fileUpload } from '../models/objectStorage';
export const router = Router();

router.get("/getIncident/:id", async (request: Request, res: Response, next: NextFunction) =>
{
	const req = request as AugmentedRequest;
	req.log.debug({ incidentId: req.params.id });
	res.send(await getIncident(req.params.id));
});
const getIncidentSwagger = {
	"/api/getIncident/{id}": {
		"get": {
			"summary": "Takes an incident id as input and returns the incident record.",
			"description": "This endpoint accepts an incident id as input and does a lookup to find the incident record, returning it in its entirety.",
			"tags": ["Fair Change API"],
			"parameters": [
				{
					"name": "id",
					"in": "path",
					"schema": {
						"type": "string"
					},
					"required": true
				}
			],
			"responses": {
				"200": {
					"description": "OK",
					"content": {
						"application/json": {
							"schema": {
								type: "object",
								properties: {
									"_id": {
										type: "string",
										example: "037c28efde11e8d86e2233738f0c20be"
									},
									"_rev": {
										type: "string",
										example: "1-2e66ec5df0bb2bc18d8b30084bdc4475"
									},
									"timestamp": {
										type: "timestamp",
										example: 1597322893635
									},
									"lat": {
										type: "number",
										example: 37.33233141
									},
									"lon": {
										type: "number",
										example: -122.0312186
									},
									"type": {
										type: "string",
										example: 37.33233141
									}
								}
							}
						}
					}
				}
			}
		}
	}
};

router.get("/getIncidents", async (req: Request, res: Response, next: NextFunction) =>
{
	const result: any[] = await getIncidents();
	const documents = result.map((r) => r.doc);
	res.send(documents);
});
const getIncidentsSwagger = {
	"/api/getIncidents": {
		"get": {
			"summary": "Returns all incidents currently in the database.",
			"description": "This endpoint returns all incidents currently in the database.",
			"tags": ["Fair Change API"],
			"responses": {
				"200": {
					"description": "OK",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								items: {
									type: "object",
									properties: {
										"_id": {
											type: "string",
											example: "037c28efde11e8d86e2233738f0c20be"
										},
										"_rev": {
											type: "string",
											example: "1-2e66ec5df0bb2bc18d8b30084bdc4475"
										},
										"timestamp": {
											type: "timestamp",
											example: 1597322893635
										},
										"lat": {
											type: "number",
											example: 37.33233141
										},
										"lon": {
											type: "number",
											example: -122.0312186
										},
										"type": {
											type: "string",
											example: 37.33233141
										}
									}
								},
								example: [
									{
										"_id": "037c28efde11e8d86e2233738f0c20be",
										"_rev": "1-2e66ec5df0bb2bc18d8b30084bdc4475",
										"timestamp": 1597322893635,
										"lat": 37.33233141,
										"lon": -122.0312186,
										"type": "incident"
									},
									{
										"_id": "037c28efde11e8d86e2233738f56b2d2",
										"_rev": "1-80191c5421b76cea8c317f0f142efb6b",
										"timestamp": 1597336671825,
										"lat": 37.33233141,
										"lon": -122.0312186,
										"type": "incident"
									}
								]
							}
						}
					}
				}
			}
		}
	}
};

// @ts-ignore don't know to get typescript to stop complaining about this
router.post("/storeIncident", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	const result = await storeIncident(req.body as Incident);
	req.log.debug({ result });
	res.send(result);
});

// @ts-ignore don't know to get typescript to stop complaining about this
router.get("/getBuckets", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	res.send(await getBuckets());
});

// @ts-ignore don't know to get typescript to stop complaining about this
router.post("/upload", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	if (req.query.incident)
	{
		const result = await fileUpload(req, res);
		const result2 = await linkVideo({
			incidentId: req.query.incident as string,
			videoName: result.Key
		});
		res.send({ result: { ...result, ...result2 } });
	}
	else
	{
		res.status(400).send({ error: "Incident ID must be provided." });
	}
});

// @ts-ignore don't know to get typescript to stop complaining about this
router.get("/getObject/:key", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	const result = await getUrl(req.params.key).catch(err => err);
	res.send(result);
});


export const swagger = {
	...getIncidentSwagger,
	...getIncidentsSwagger
};
