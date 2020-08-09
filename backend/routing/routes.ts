import { Router, Response, NextFunction } from "express";
import { Incident, storeIncident, getIncident } from '../models/incident';
import { AugmentedRequest } from "./logging";
export const router = Router();

// @ts-ignore don't know to get typescript to stop complaining about this
router.get("/getIncident/:id", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	req.log.debug({ incidentId: req.params.id });
	res.send(await getIncident(req.params.id));
});

// @ts-ignore don't know to get typescript to stop complaining about this
router.post("/storeIncident", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	const result = await storeIncident(req.body as Incident);
	req.log.debug({ result });
	res.send(result);
});
