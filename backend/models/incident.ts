
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
	topic: string,
	_id?: string
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

type linkVideoProps = { incidentId: string, videoName: string };
export const linkVideo = async ({ incidentId, videoName }: linkVideoProps): Promise<any> =>
{
	const doc = await getById(incidentId);
	doc.incidentVideos = doc.incidentVideos ? [...doc.incidentVideos, videoName] : [videoName];

	return create({
		doc: doc,
		type: "incident"
	});
};
