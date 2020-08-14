import React, { useEffect } from "react";
import styles from "./IncidentMap.module.scss";
import {
	SET_SEARCH_REQUEST,
	SET_REPORT,
	SET_MAP,
	SET_MARKERS,
	SET_USER_LOCATION,
	IMapContextState,
	IMapContextDispatch,
	Report
} from "../../context/MapContext";
import { data } from '../common/map.data.json';
import L from 'leaflet';
import { useApi } from '../../hooks/useApi';
import { IncidentReport } from '../common/MapUtils';
import { IncidentResponse } from "../common/types";

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
	const { getData, isLoading, error } = useApi();

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

	const reportQuery = (reportObj?: Report) =>
	{
		if (reportObj)
		{
			dispatch({
				type: SET_REPORT,
				value: reportObj
			});
		}
		else
		{
			dispatch({
				type: SET_REPORT,
				value: { ...state.report }
			});
		}

		console.log('STATE!!!', state);
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

	const placeMarker = (lat: number, lon: number, desc?: string) =>
	{
		console.log(lat, lon);
		dispatch({
			type: SET_MARKERS,
			value: L.marker([lat, lon]).
				bindPopup(`<a href="#" id="event">${desc ? desc : 'No Description'}</a>`).
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
		//reportQuery(reportObj);

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

		Object.keys(report).forEach((valueStr, index) =>
		{
			if (valueStr === 'lat')
			{
				for (let geoIndex = 0; geoIndex < report.lat.length; geoIndex++)
				{
					if (report.lat[geoIndex] <= extremes.latMax &&
						report.lat[geoIndex] >= extremes.latMin &&
						(report.lon[geoIndex] * -1) > extremes.lonMax &&
						(report.lon[geoIndex] * -1) < extremes.lonMin)
					{
						// eslint-disable-next-line max-depth
						if (loc == false)
						{
							cmap.remove();
							map(userLocation ? userLocation.lat : 0, userLocation ? userLocation.lon : 0);
							loc = true;
						}
						placeMarker(report.lat[geoIndex], report.lon[geoIndex], report.description[geoIndex]);
					}
					else if (search == false)
					// eslint-disable-next-line sonarjs/no-duplicated-branches
					{
						// eslint-disable-next-line max-depth
						if (loc == false)
						{
							cmap.remove();
							map(userLocation ? userLocation.lat : 0, userLocation ? userLocation.lon : 0);
							loc = true;
						}
						placeMarker(report.lat[geoIndex], report.lon[geoIndex], report.description[geoIndex]);
					}
					else if (search == true)
					{
						// eslint-disable-next-line max-depth
						if (searchReq && report.country[index] == searchReq.country)
						{
							// eslint-disable-next-line max-depth
							if (loc == false)
							{
								dispatch({
									type: SET_USER_LOCATION,
									value: {
										lon: report.lon[geoIndex],
										lat: report.lat[geoIndex]
									}
								});
								cmap.remove();
								map(report.lat[geoIndex], report.lon[geoIndex]);

								loc = true;
							}
							placeMarker(report.lat[geoIndex], report.lon[geoIndex], report.description[geoIndex]);
						}
					}
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
		console.log('STARTING!!');
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
		const getReport = async () =>
		{
			console.log('GETTING REPORTS!');
			const res = await getData({
				url: "/api/Incidents"
			});
			const reportObj = IncidentReport(res as IncidentResponse[]);
			reportQuery(reportObj);
			Promise.resolve();
			//start();
		};
		getReport().
			then((res) =>
			{
				start();
			});
		//start();
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
