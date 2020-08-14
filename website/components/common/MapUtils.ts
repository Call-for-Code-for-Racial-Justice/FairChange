import { useApi } from '../../hooks/useApi';
import { IncidentResponse } from './types';

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


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const Incidents = (data: IncidentResponse[]) =>
// {
// 	//const incidents = data;
// 	return data;
// };


