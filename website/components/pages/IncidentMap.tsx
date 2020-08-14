import React, { useEffect } from "react";
import styles from "./IncidentMap.module.scss";
import {
	SET_SEARCH_REQUEST,
	SET_REPORT,
	SET_MAP,
	SET_MARKERS,
	SET_USER_LOCATION,
	IMapContextState,
	IMapContextDispatch
} from "../../context/MapContext";
import { data } from '../common/map.data.json';
import L from 'leaflet';

const reducer = (state: IMapContextState, action: IMapContextDispatch): IMapContextState =>
{
	switch (action.type)
	{
		case SET_MARKERS:
			return {
				...state,
				markers: action.value
			};

		case SET_MAP:
			return {
				...state,
				map: action.value
			};

		case SET_SEARCH_REQUEST:
			return {
				...state,
				searchReq: {
					...state.searchReq,
					...action.value
				}
			};

		case SET_USER_LOCATION:
			return {
				...state,
				userLocation: {
					...state.userLocation,
					...action.value
				}
			};

		case SET_REPORT:
			return {
				...state,
				report: {
					...state.report,
					...action.value
				}
			};

		default:
			return state;
	}
};
export const IncidentMap = (): JSX.Element =>
{
	// const { dispatch, markers, map: cmap, searchReq, userLocation, report } = useMapContext();

	let state: IMapContextState = {
		map: null,
		markers: [],
		report: {
			id: [],
			lat: [],
			lon: [],
			description: [],
			country: [],
			state: []
		}
	};

	let { markers, map: cmap, searchReq, userLocation, report } = state;

	interface IMapContextDispatch {
		type: string,
		value: any
	}
	const dispatch = (action: IMapContextDispatch) =>
	{
		state = reducer(state, action);
		({ markers, searchReq, userLocation, report, map: cmap } = state);
	};

	const mapObj = (inMap: any, inMarkers: any) =>
	{
		dispatch({ type: SET_MAP, value: inMap });
		dispatch({ type: SET_MARKERS, value: inMarkers });
	};

	const reportQuery = () =>
	{
		dispatch({
			type: SET_REPORT,
			value: {
				id: data[0].Index,
				lat: data[0].Lat,
				lon: data[0].Lon,
				description: data[0].Description,
				country: data[0].Country,
				state: data[0].State
			}
		});
	};

	const map = (lat: number, lon: number) =>
	{
		const myMap = L.map('mapid').setView([lat, lon], 6);

		const layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1IjoiZGF2ZXp1bmlnYSIsImEiOiJja2RqZWR2YnQwMGN5MnF0MnlzbzR6N2RkIn0.IbVbFPrE6cCQxt1rNW-bIQ'
		});

		myMap.addLayer(layer);
		dispatch({
			type: SET_MAP,
			value: myMap
		});
	};

	const placeMarker = (lat: number, lon: number, desc: string) =>
	{
		dispatch({
			type: SET_MARKERS,
			value: L.marker([lat, lon]).
				bindPopup(`<a href="#" id="event">${desc}</a>`).
				openPopup()
		});

		markers.addTo(cmap);
		dispatch({
			type: SET_SEARCH_REQUEST,
			value: {
				total: searchReq ? searchReq.total + 1 : 1
			}
		});
	};

	const updateMap = (search: boolean, radius: number) =>
	{
		let loc = false;
		reportQuery();

		const extremes = {
			latMax: radius,
			latMin: radius,
			lonMax: radius,
			lonMin: radius
		};

		dispatch({
			type: SET_USER_LOCATION,
			value: {
				radius
			}
		});

		if (search == true)
		{
			extremes.latMax = userLocation ? userLocation.lat + radius : radius;
			extremes.latMin = userLocation ? userLocation.lat - radius : -radius;
			extremes.lonMax = userLocation ? (userLocation.lon * -1) - radius : -radius;
			extremes.lonMin = userLocation ? (userLocation.lon * -1) + radius : radius;
		}

		dispatch({
			type: SET_SEARCH_REQUEST,
			value: {
				total: 0
			}
		});

		Object.keys(report.lat).forEach((valueStr, index) =>
		{
			const value = parseInt(valueStr, 10);
			if (value <= extremes.latMax &&
				value >= extremes.latMin &&
				(report.lon[index] * -1) > extremes.lonMax &&
				(report.lon[index] * -1) < extremes.lonMin)
			{
				if (loc == false)
				{
					cmap.remove();
					map(userLocation ? userLocation.lat : 0, userLocation ? userLocation.lon : 0);
					loc = true;
				}
				placeMarker(report.lat[index], report.lon[index], report.description[index]);
			}
			else if (search == false)
			{
				if (loc == false)
				{
					cmap.remove();
					map(userLocation ? userLocation.lat : 0, userLocation ? userLocation.lon : 0);
					loc = true;
				}

				placeMarker(report.lat[index], report.lon[index], report.description[index]);
			}
			else if (search == true)
			{
				if (searchReq && report.country[index] == searchReq.country)
				{
					if (loc == false)
					{
						dispatch({
							type: SET_USER_LOCATION,
							value: {
								lon: report.lon[index],
								lat: report.lat[index]
							}
						});
						cmap.remove();
						map(report.lat[index], report.lon[index]);

						loc = true;
					}

					placeMarker(report.lat[index], report.lon[index], report.description[index]);
				}
			}

		});

		if (searchReq && searchReq.total == 0)
		{
			// eslint-disable-next-line
			alert("No reports for the selected location");
		}

		dispatch({
			type: SET_SEARCH_REQUEST,
			value: {
				total: 0
			}
		});
	};

	const start = () =>
	{
		dispatch({
			type: SET_USER_LOCATION,
			value: {
				lat: 39.79160533247704,
				lon: -100.70268789896711
			}
		});

		map(userLocation ? userLocation.lat : 0, userLocation ? userLocation.lon : 0);

		updateMap(false, 6);
	};
	useEffect(() =>
	{
		start();
	}, []);

	return (
		<>
			<div id="overlay"></div>
			<div className="padding highlightable">

				<div id="top-bar">

					<div id="top-github-link">
						<a className="github-link highlight" href="https://github.com/embrace-call-for-code/fairchange/blob/master/readme.txt" target="blank">
							"How can you help?"
						</a>
					</div>

					<div id="breadcrumbs" >
						<span id="sidebar-toggle-span">
							<a href="#" id="sidebar-toggle" data-sidebar-toggle="" className="highlight">
								<i className="fa fa-bars"></i>
							</a>
						</span>
						<span id="toc-menu"><p className="higlight">Incidents</p></span>
						<span className="links">

						</span>

						<p className="higlight">Reports</p>
					</div>

				</div>

				<div id="body-inner">

				</div>
			</div>
			<div className="row" id="mapid"></div>
		</>
	);
};
