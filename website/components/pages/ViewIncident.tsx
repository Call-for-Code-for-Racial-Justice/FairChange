/* eslint-disable brace-style */
import React, { useEffect, useState } from "react";
import styles from "./ViewIncident.module.scss";
import { useApi } from '../../hooks/useApi';
import { Loading } from 'carbon-components-react';
import ReactPlayer from 'react-player';

type Incident = {
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
	incidentVideos: Array<string>,
	_id?: string
};

type URL = [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown];

export const ViewIncident = (): JSX.Element => {
	// const incidentId = { match.params.id };
	const incidentId = "0ea652e8296aef4556e819c889011e05";
	const { getData, isLoading, error } = useApi();
	const [incident, setIncident] = useState<Incident | {}>({});
	const [videos, setVideo] = useState<URL | []>([]);

	useEffect(() => {
		const goGetIt = async () => {
			const data = await getData({
				url: `/api/getIncident/${incidentId}`
			});
			console.log(data);
			setIncident(data);

			return data;
		};

		goGetIt().then(async (r) => {
			const videoIds = r.incidentVideos;
			const videoUrls = await Promise.all(videoIds.map(async (id: string) => {
				const link = `/api/getObject/${id}`;
				return getData({
					url: link
				});
			}));
			console.log(videoUrls);
			setVideo(videoUrls);
		});
	}, []);

	if (error) {
		return (
			<div>
				{error.message}
			</div>
		);
	}

	if (isLoading) {
		return (
			<Loading />
		);
	}

	// <video autoPlay width="500px" key={url} src={url} type="video/mp4" onClick={(e) => videoClick(e)}></video>
	let videoElements = [];
	videoElements = (videos as Array<string>).map((url: string) => {
		return (
			<ReactPlayer key={url} url={url} controls={true}>
			</ReactPlayer>
		);
	});

	return (
		<div className={styles.main}>
			<h1>View Incident</h1>

			<div className="video-container">
				{videoElements}
			</div>

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
