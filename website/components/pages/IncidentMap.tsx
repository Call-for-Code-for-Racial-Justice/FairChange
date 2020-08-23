import React, { useEffect } from 'react';
import { useMapContext, SET_MARKERS, ADD_MARKERS, REMOVE_MARKER, SET_CENTER } from "../../context/MapContext";
import data from '../common/map.dataBetter.json';
import styles from './IncidentMap.module.scss';
import { getCenter } from '../common/MapUtils';

export const IncidentMap = () =>
{
	const { loaded, mapRef, selectedMarker, dispatch, reset } = useMapContext();
	// const [current, setCurrent] = useState<any>(null);
	useEffect(() =>
	{
		reset();
	}, []);

	useEffect(() =>
	{
		const center = getCenter(data);

		dispatch({
			type: SET_CENTER,
			value: center
		});

		dispatch({
			type: SET_MARKERS,
			value: data
		});
	}, [loaded]);

	const handleClick = () =>
	{
		dispatch({
			type: ADD_MARKERS,
			value: [
				{
					lat: 38.504147,
					lon: -110.486090,
					city: "Owee",
					state: "South State",
					country: "USA",
					description: "Testing this"
				}
			]
		});
	};

	const handleClick2 = () =>
	{
		dispatch({
			type: REMOVE_MARKER,
			value: {
				"lat": 40.7774,
				"lon": -111.93,
				"description": "Police chase journalist",
				"city": "Salt Lake City",
				"country": "United States",
				"dateTime": "7/9/2020 10:10",
				"state": "Utah",
				"url1": "https://twitter.com/kylemoonsgirl/status/1281450911731052544",
				"url2": null,
				"badge": null,
				"icon": "img/bullseye.png"
			}
		});
	};

	return (
		<>
			<div ref={mapRef} className={styles.map}/>
			<section>
				{selectedMarker == null ? null : <>
					<div>Description: {selectedMarker.description}</div>
					<div>City: {selectedMarker.city}</div>
					<div>State: {selectedMarker.state}</div>
					<div>Country: {selectedMarker.country}</div>
				</>
				}
			</section>
			<button onClick={handleClick}>Add Marker</button>
			<button onClick={handleClick2}>Remove Marker</button>
		</>
	);
};
