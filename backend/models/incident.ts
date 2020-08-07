
import { create, getById } from './common';

export type Incident = {
	timestamp: string,
    incidentCategory: string,
	incidentId: string,
	description: string,
    location: string,
    lat: number,
	lon: number,
	country: string,
	state: string,
	city: string,
	topic: string
};

export const storeIncident = async (data: Incident): Promise<any> =>
{
	return create({
		doc: data,
		type: "incident"
	});
};

export const getIncident = async (id: string): Promise<any> =>
{
	return getById(id);
};
