import React, { createContext, useReducer, Dispatch, Context, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useScript } from '../hooks/useScript';
import { mapContextReducer, SET_MAP, SET_SELECTED_MARKER, SET_GOOGLE_MARKERS, RESET } from "./MapContextReducer";
import {} from 'googlemaps';
import find from "lodash/find";
export {
	SET_MARKERS,
	ADD_MARKERS,
	REMOVE_MARKER,
	SET_GOOGLE_MARKERS,
	SET_SELECTED_MARKER,
	SET_CENTER,
	SET_MAP
} from "./MapContextReducer";

// const googleMapsApiKey = "AIzaSyClzMUaK1lMgIQeOTdofdEV_-O9ys1n6j4";

export interface IMapContextState {
	map: google.maps.Map | null,
	markers: any,
	gmarkers: google.maps.Marker[] | null,
	selectedMarker: any
	center: null
}

const initialState:IMapContextState = {
	map: null,
	markers: null,
	gmarkers: null,
	selectedMarker: null,
	center: null
};

export interface IMapContextDispatch {
	type: string,
	value: any
}

export interface IMapContext {
	map: any,
	markers: any,
	gmarkers: any,
	selectedMarker: any,
	loaded: boolean,
	error: any,
	mapRef: React.MutableRefObject<any> | null,

	reset: Function,
	dispatch: Dispatch<IMapContextDispatch>
}

const initialContext: IMapContext = {
	map: initialState.map,
	markers: initialState.markers,
	gmarkers: initialState.gmarkers,
	selectedMarker: initialState.selectedMarker,
	loaded: false,
	error: null,
	mapRef: null,
	reset: () => { /* do nothing because this will be replaced */ },
	dispatch: () => { /* do nothing because this will be replaced */ }
};

export const MapContext: Context<IMapContext> = createContext(initialContext);

type props = {
	children?: ReactNode,
	googleMapsApiKey: string
};

export const MapContextProvider = ({ children, googleMapsApiKey }: props): JSX.Element =>
{
	const mapApiUrl = `https://maps.google.com/maps/api/js?libraries=geometry&key=${googleMapsApiKey}`;
	const { loaded, error } = useScript(mapApiUrl);
	const [state, dispatch] = useReducer(mapContextReducer, initialState);
	const mapRef = useRef(null);

	const reset = () =>
	{
		dispatch({
			type: RESET,
			value: initialState
		});
	};

	const buildMarker = (pin: any) =>
	{
		if (state.map != null)
		{
			const marker = new window.google.maps.Marker({
				position: { lat: pin.lat, lng: pin.lon },
				map: state.map,
				icon: pin.icon,
				title: pin.description
			});
			(marker as any).pin = pin;
			marker.addListener('click', () =>
			{
				dispatch({
					type: SET_SELECTED_MARKER,
					value: pin
				});
			});

			return marker;
		}
		return null;
	};

	useEffect(() =>
	{
		if (loaded === true)
		{
			if (mapRef != null)
			{
				const options = {
					// disableDefaultUI: true,
					zoomControl: true,
					// gestureHandling: "greedy",
					controlSize: 20,
					center: state.center || { lat: 39.79160533247704, lng: -100.70268789896711 },
					// center: center,
					zoom: 5
					// ...props.options
				};

				const newMap = mapRef && mapRef.current
					? new window.google.maps.Map(mapRef.current as unknown as Element, options)
					: null;
				dispatch({
					type: SET_MAP,
					value: newMap
				});
			}

		}
	}, [loaded, mapRef.current]);

	useEffect(() =>
	{
		if (state.map && state.markers != null)
		{
			let googleMarkers = state.gmarkers;
			if (state.gmarkers == null)
			{
				googleMarkers = state.markers.map((pin: any) => buildMarker(pin));
			}
			else
			{
				state.markers.forEach((pin: any) =>
				{
					const match = find(googleMarkers, { pin: { lat: pin.lat, lon: pin.lon } });
					if (!match)
					{
						const newMarker = buildMarker(pin);
						if (newMarker != null)
						{
							googleMarkers!.push(newMarker);
						}
					}
				});
				if (googleMarkers != null)
				{
					const remain = googleMarkers.reduce((prev: google.maps.Marker[], current, index) =>
					{
						const match = find(
							state.markers,
							{ lat: (current as any).pin.lat, lon: (current as any).pin.lon }
						);
						if (!match)
						{
							current.setMap(null);
						}
						else
						{
							prev.push(current);
						}
						return prev;
					}, []);
					googleMarkers = remain;
				}
			}

			dispatch({
				type: SET_GOOGLE_MARKERS,
				value: googleMarkers
			});
		}
	}, [state.markers, state.map]);

	useEffect(() =>
	{
		if (state && state.center != null && state.map != null)
		{
			state.map.setCenter(state!.center!);
		}
	}, [state.center]);

	return (
		<MapContext.Provider value={{
			map: state.map,
			markers: state.markers,
			gmarkers: state.gmarkers,
			selectedMarker: state.selectedMarker,
			loaded,
			error,
			mapRef,
			reset,
			dispatch
		}}>
			{children}
		</MapContext.Provider>
	);
};

export const useMapContext = (): IMapContext =>
{
	return useContext(MapContext);
};
