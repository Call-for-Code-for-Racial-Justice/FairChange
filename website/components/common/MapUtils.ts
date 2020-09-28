import { IncidentResponse } from './types';
import { MapMarker } from '../../context/MapContext';

export const IncidentCountries = (data: IncidentResponse[]) : string[] =>
{
	const countries: string[] = [];
	data.forEach((incident) =>
	{
		if (incident.doc.country)
		{
			const countryExist = countries.find((c) => c === incident.doc.country);
			if (!countryExist)
			{
				countries.push(incident.doc.country);
			}
		}
	});

	return countries;
};

export const IncidentReport = (data: IncidentResponse[]): any =>
{
	// const reportOpj: Report = {
	// 	id: [],
	// 	lat: [],
	// 	lon: [],
	// 	description: [],
	// 	country: [],
	// 	state: []
	// };

	data.filter((incident) =>
	{
		// eslint-disable-next-line no-undefined
		return incident.doc.lat != undefined;
	}).
		forEach((incident) =>
		{
			// reportOpj.id.push(parseInt(incident.id, 10));
			// reportOpj.lat.push(incident.doc.lat);
			// reportOpj.lon.push(incident.doc.lon);
			// reportOpj.description.push(incident.doc.description ? incident.doc.description : '');
			// reportOpj.country.push(incident.doc.country ? incident.doc.country : '');
			// reportOpj.state.push(incident.doc.state ? incident.doc.state : '');

		});

	// return reportOpj;
};

export const getCenter = (data: MapMarker[]): { lat: number, lng: number } =>
{
	let latSum = 0;
	let lngSum = 0;

	data.forEach(item =>
	{
		latSum += item.lat || 0;
		lngSum += item.lon || 0;
	});

	return { lat: latSum / data.length, lng: lngSum / data.length };
};

export const searchByCountryState = (data: MapMarker[], country: string, state: string): MapMarker[] =>
{
	return data.filter((item: any) => item.country == country && (state == "" || item.state == state));
};

export const searchRadius = (data: MapMarker[], lat: number, lng: number, radius: number): MapMarker[] =>
{
	const latMin = lat - radius;
	const latMax = lat + radius;
	const lngMin = lng - radius;
	const lngMax = lng + radius;
	return data.filter((item: MapMarker) => (
		(latMin <= item.lat) &&
		(item.lat <= latMax) &&
		(lngMin <= item.lon) &&
		(item.lon <= lngMax)));
};
