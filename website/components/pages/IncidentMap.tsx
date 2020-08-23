import React, { useEffect } from 'react';
import { useMapContext, SET_MARKERS, ADD_MARKERS, REMOVE_MARKER } from "../../context/MapContext";
import { data } from '../common/map.data.json';
import styles from './IncidentMap.module.scss';

export const IncidentMap = () =>
{
	const { loaded, mapRef, selectedMarker, dispatch } = useMapContext();
	// const [current, setCurrent] = useState<any>(null);

	useEffect(() =>
	{
		const newMarkers = Object.keys(data[0].Lat).map(key =>
		{
			return {
				lat: (data as any)[0].Lat[key],
				lon: (data as any)[0].Lon[key],
				description: (data as any)[0].Description[key],
				city: (data as any)[0].City[key],
				country: (data as any)[0].Country[key],
				dateTime: (data as any)[0]["Date/time"][key],
				state: (data as any)[0].State[key],
				url1: (data as any)[0]["URL 1"][key],
				url2: (data as any)[0]["URL 2"][key],
				badge: (data as any)[0].Badge[key],
				icon: "img/bullseye.png"
			};
		});

		dispatch({
			type: SET_MARKERS,
			value: newMarkers
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
