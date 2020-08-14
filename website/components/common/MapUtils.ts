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

