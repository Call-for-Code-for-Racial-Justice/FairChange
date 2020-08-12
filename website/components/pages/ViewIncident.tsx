import React, { useEffect, useState } from "react";
import styles from "./ViewIncident.module.scss";
import { useApi } from '../../hooks/useApi';
import { Loading } from 'carbon-components-react';
import { Incident } from "../../../backend/models/incident";
export const ViewIncident = ():JSX.Element =>
{
	const { getData, isLoading, error } = useApi();
	const [incident, setIncident] = useState<Incident | {}>({});

	useEffect(() =>
	{
		const goGetIt = async () =>
		{
			const data = await getData({
				url: "/api/getIncident/b4d96a05c940b34023ce4949e255280f"
			});
			console.log(data);
			setIncident(data);
		};

		goGetIt();
	}, []);

	if (error)
	{
		return (
			<div>
				{error.message}
			</div>
		);
	}

	if (isLoading)
	{
		return (
			<Loading />
		);
	}

	return (
		<div className={styles.main}>
			<h1>View Incident</h1>

			<div>
				<ul>
					<li>ID: {(incident as Incident)._id}</li>
					<li>Category: {(incident as Incident).incidentCategory}</li>
					<li>Description: {(incident as Incident).description}</li>
					<li>Location: {(incident as Incident).location}</li>
					<li>City: {(incident as Incident).city}</li>
					<li>State: {(incident as Incident).state}</li>
					<li>Country: {(incident as Incident).country}</li>
				</ul>
			</div>
		</div>
	);
};
