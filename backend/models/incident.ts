
import { create } from './common';

export type Incident = {
	date: string,
    incidentCategory: string,
    incidentId: string,
    lat: number,
    lon: number,
    state: string,
    topic: string
};

export const storeIncident = async (data: Incident): Promise<any> =>
{
	return create({
		doc: data,
		type: "incident"
	});
};
