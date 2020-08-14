import { IncidentResponse } from './types';
import { Report } from '../../context/MapContext';

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

export const IncidentReport = (data: IncidentResponse[]): Report =>
{
	const reportOpj: Report = {
		id: [],
		lat: [],
		lon: [],
		description: [],
		country: [],
		state: []
	};

	data.filter((incident) =>
	{
		// eslint-disable-next-line no-undefined
		return incident.doc.lat != undefined;
	}).
		forEach((incident) =>
		{
			reportOpj.id.push(parseInt(incident.id, 10));
			reportOpj.lat.push(incident.doc.lat);
			reportOpj.lon.push(incident.doc.lon);
			reportOpj.description.push(incident.doc.description ? incident.doc.description : '');
			reportOpj.country.push(incident.doc.country ? incident.doc.country : '');
			reportOpj.state.push(incident.doc.state ? incident.doc.state : '');

		});

	return reportOpj;
};

