import { Router, Response, NextFunction } from "express";
import { Incident, storeIncident } from '../models/incident';
import { AugmentedRequest } from "./logging";
export const router = Router();

router.get("/", (req, res) =>
{
	// FE/map code should hit this endpooint to get user data which will include mapping coordinates
});

// @ts-ignore don't know to get typescript to stop complaining about this
router.post("/api/storeIncident", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	const result = await storeIncident(req.body);
	req.log.debug({ result });
	res.send(result);
});
