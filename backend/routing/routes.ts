import { Router, Request, Response, NextFunction } from "express";
import { Incident, storeIncident, getIncident, linkVideo, getIncidents } from '../models/incident';
import { AugmentedRequest } from "./logging";
import { getUrl, fileUpload } from '../models/objectStorage';
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
								"$ref": "#/definitions/Incident"
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
									"$ref": "#/definitions/Incident"
								}
							},
							example: [
								{
									"_id": "9de4bec019a1dd08447ff30a210f4dde",
									"_rev": "1-a2c86097b0036cc0330eb4cee1db05a1",
									"lat": 33.798,
									"lon": -118.1675,
									"description": "Woman struck in finger by projectile; police quell crowd with tear gas",
									"city": "Long Beach",
									"country": "United States",
									"dateTime": "6/1/2020 16:12",
									"state": "California",
									"url1": "https://www.tiktok.com/@scottmbark/video/6833632749052628230",
									"url2": "https://www.tiktok.com/@scottmbark/video/6833477841808657669",
									"badge": null,
									"icon": "/img/bullseye.png",
									"incidentVideos": [
										"incidentVideo-1597397050965",
										"incidentVideo-15973970509652",
										"incidentVideo-15973970509653"
									]
								},
								{
									"_id": "9de4bec019a1dd08447ff30a210f5a10",
									"_rev": "1-c6a1c0305891c51497b8cf722e635fb0",
									"lat": 34.1139,
									"lon": -118.4068,
									"description": "Police use tear gas and riot rounds against protestors",
									"city": "Los Angeles",
									"country": "United States",
									"dateTime": "5/29/2020 14:29",
									"state": "California",
									"url1": "https://vimeo.com/424352612",
									"url2": "https://www.reddit.com/r/LosAngeles/comments/gti4eg/la_riots_5292020_police_line_advances_with_their/",
									"badge": null,
									"icon": "/img/bullseye.png",
									"incidentVideos": [
										"incidentVideo-1597397050965",
										"incidentVideo-15973970509652",
										"incidentVideo-15973970509653"
									]
								},
								{
									"_id": "9de4bec019a1dd08447ff30a210f6957",
									"_rev": "1-3d9c9a8faf6304cd72352be0b32bb35f",
									"lat": 34.1139,
									"lon": -118.4068,
									"description": "Protestor shot in head",
									"city": "Los Angeles",
									"country": "United States",
									"dateTime": "5/30/2020 9:53",
									"state": "California",
									"url1": "https://twitter.com/greg_doucette/status/1268052132252602368",
									"url2": "https://twitter.com/andrewcurryla/status/1266906677820833793",
									"badge": null,
									"icon": "/img/bullseye.png",
									"incidentVideos": [
										"incidentVideo-1597397050965",
										"incidentVideo-15973970509652",
										"incidentVideo-15973970509653"
									]
								}
							]
						}
					}
				}
			}
		}
	}
};

const getIncidentsSwaggerSchemas = {
	Incident: {
		type: "object",
		properties: {
			"_id": {
				type: "String",
				example: "037c28efde11e8d86e2233738f0c20be"
			},
			"_rev": {
				type: "String",
				example: "1-2e66ec5df0bb2bc18d8b30084bdc4475"
			},
			"timestamp": {
				type: "Timestamp",
				example: 1597322893635
			},
			"lat": {
				type: "Number",
				example: 37.33233141
			},
			"lon": {
				type: "Number",
				example: -122.0312186
			},
			"description": {
				type: "String",
				example: "Police use tear gas and riot rounds against protestors"
			},
			"city": {
				type: "String",
				example: "Long Beach"
			},
			"country": {
				type: "String",
				example: "United States"
			},
			"dateTime": {
				type: "String",
				example: "6/1/2020 16:12"
			},
			"state": {
				type: "String",
				example: "California"
			},
			"url1": {
				type: "String",
				example: "https://www.tiktok.com/@scottmbark/video/6833632749052628230"
			},
			"url2": {
				type: "String",
				example: "https://www.tiktok.com/@scottmbark/video/6833477841808657669"
			},
			"badge": {
				type: "String",
				example: "12346572"
			},
			"icon": {
				type: "String",
				example: "/img/bullseye.png"
			},
			"type": {
				type: "String",
				example: 37.33233141
			},
			"incidentVideos": {
				type: "array",
				items: {
					type: "String",
					example: [
						"incidentVideo-1597397050965",
						"incidentVideo-15973970509652",
						"incidentVideo-15973970509653"
					]
				}
			}
		}
	}
};

// @ts-ignore don't know to get typescript to stop complaining about this
router.post("/storeIncident", async (request: Request, res: Response, next: NextFunction) =>
{
	const req = request as AugmentedRequest;
	const result = await storeIncident(req.body as Incident);
	req.log.debug({ result });
	res.send(result);
});
const storeIncidentSwagger = {
	"/api/storeIncident": {
		post: {
			summary: "Creates an incident record and stores the data sent in the body.",
			description: "Takes incident data and stores it in the database, creating an incident record.  All entries included in the request body will be stored in the database.  The example below is just a sample of possible entries.",
			tags: ["Fair Change API"],
			requestBody: {
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								"timestamp": {
									type: "String",
									example: "01/01/2020-12:00:00.000"
								},
								"incidentCategory": {
									type: "String",
									example: "speeding"
								},
								"incidentId": {
									type: "String",
									example: "id from front end"
								},
								"description": {
									type: "String",
									example: "This is a test of this process"
								},
								"location": {
									type: "String",
									example: "side of the highway"
								},
								"lat": {
									type: "String",
									example: 23
								},
								"lon": {
									type: "String",
									example: 26
								},
								"country": {
									type: "String",
									example: "USA"
								},
								"state": {
									type: "String",
									example: "Illinois"
								},
								"city": {
									type: "String",
									example: "Chicago"
								},
								"topic": {
									type: "String",
									example: "something"
								}
							}
						}
					}
				}
			},
			responses: {
				"200": {
					"description": "OK",
					"content": {
						"application/json": {
							"schema": {
								"type": "object",
								properties: {
									"ok": {
										type: "Boolean",
										example: true
									},
									"id": {
										type: "String",
										example: "3f4efcf6dfb9beb8cd3370cbe671df6d"
									},
									"rev": {
										type: "String",
										example: "1-8d1a911ae29f1a667929dcd9e4fa4c2c"
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


router.post("/upload", async (request: Request, res: Response, next: NextFunction) =>
{
	const req = request as AugmentedRequest;
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
const uploadSwagger = {
	"/api/upload": {
		post: {
			summary: "Uploads an incident video and stores it in Cloud Object Storage",
			description: "Takes an incident ID and a video file as input.  Once video has uploaded, the retrieval key is attached to the incident record.",
			tags: ["Fair Change API"],
			requestBody: {
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							properties: {
								"incident": {
									type: "string",
									in: "formData",
									example: "incidentVideo-1597397050965"
								},
								"incidentVideo": {
									type: "file",
									in: "formData"
								}
							}
						}
					}
				}
			},
			responses: {
				"200": {
					"description": "OK",
					"content": {
						"application/json": {
							"schema": {
								"type": "object",
								properties: {
									result: {
										type: "object",
										properties: {
											"Location": {
												type: "String",
												example: "http://emb-race-fair-change.s3.us-east.cloud-object-storage.appdomain.cloud/incidentVideo-1601619580521"
											},
											"Bucket": {
												type: "String",
												example: "emb-race-fair-change"
											},
											"Key": {
												type: "String",
												example: "incidentVideo-1601619580521"
											},
											"ETag": {
												type: "String",
												example: "c7cab1a2efc68ed8d50dd4ad8ad8e9d6-16"
											},
											"ok": {
												type: "Boolean",
												example: true
											},
											"id": {
												type: "String",
												example: "9de4bec019a1dd08447ff30a210f5a10"
											},
											"rev": {
												type: "String",
												example: "2-3862f299f24e189ee421b032ffbb921f"
											}
										}
									}
								},
								example: {
									"result": {
										"Location": "http://emb-race-fair-change.s3.us-east.cloud-object-storage.appdomain.cloud/incidentVideo-1601619580521",
										"Bucket": "emb-race-fair-change",
										"Key": "incidentVideo-1601619580521",
										"ETag": "\"c7cab1a2efc68ed8d50dd4ad8ad8e9d6-16\"",
										"ok": true,
										"id": "9de4bec019a1dd08447ff30a210f5a10",
										"rev": "2-3862f299f24e189ee421b032ffbb921f"
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

router.get("/getObject/:key", async (req: Request, res: Response, next: NextFunction) =>
{
	const result = await getUrl(req.params.key).catch(err => err);
	res.send(result);
});
const getObjectSwagger = {
	"/api/getObject/{key}": {
		"get": {
			"summary": "Takes an incident video key and returns a temporary URL to retrieve the video.",
			"description": "This endpoint accepts an incident video key as input and requests Cloud Object Storage to generate a temporary URL to retrieve the video.  The URL expires in 60 seconds.",
			"tags": ["Fair Change API"],
			"parameters": [
				{
					"name": "key",
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
								"type": "String",
								"example": "https://emb-race-fair-change.s3.us-east.cloud-object-storage.appdomain.cloud/incidentVideo-1597397050965?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=1620157c6dcc47faa9846901142a0ddb%2F20201002%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201002T054747Z&X-Amz-Expires=60&X-Amz-Signature=2ec833720ce2ad85584f8d656113840b622cbe0b3651938552de975e928702eb&X-Amz-SignedHeaders=host"
							}
						}
					}
				}
			}
		}
	}
};


export const swagger = {
	...getIncidentSwagger,
	...getIncidentsSwagger,
	...storeIncidentSwagger,
	...uploadSwagger,
	...getObjectSwagger
};

export const schemas = {
	...getIncidentsSwaggerSchemas
};
