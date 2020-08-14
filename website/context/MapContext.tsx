import React, { createContext, useReducer, Dispatch, Context, ReactNode, useContext } from "react";

export const SET_MARKERS = "Set map markers";
export const SET_MAP = "Set map";
export const SET_SEARCH_REQUEST = "Set search request";
export const SET_USER_LOCATION = "Set user location";
export const SET_REPORT = "Set report";

export type SearchRequest = {
	country: string,
	state?: string,
	dateFrom?: string,
	dateTo?: string,
	total: number
};

export type UserLocation = {
	lat: number,
	lon: number,
	radius: number
};

export type Report = {
	id: number[],
	lat: number[],
	lon: number[],
	description: string[],
	country: string[],
	state: string[]
}
export interface IMapContextState {
	map: any,
	markers: any,
	searchReq?: SearchRequest,
	userLocation?: UserLocation,
	report: Report
}

const initialState:IMapContextState = {
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

export interface IMapContextDispatch {
	type: string,
	value: any
}

const reducer = (state: IMapContextState, action: IMapContextDispatch): IMapContextState =>
{
	console.log(state, action);

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

export interface IMapContext {
	map: any,
	markers: any,
	searchReq?: SearchRequest,
	userLocation?: UserLocation,
	report: Report,
	dispatch: Dispatch<IMapContextDispatch>
}

const initialContext: IMapContext = {
	map: initialState.map,
	markers: initialState.markers,
	report: initialState.report,
	dispatch: () => { /* do nothing because this will be replaced */ }
};

export const MapContext: Context<IMapContext> = createContext(initialContext);

type props = {
	children?: ReactNode
};

export const MapContextProvider = ({ children }: props): JSX.Element =>
{
	const [state, dispatch] = useReducer(
		reducer,
		initialState
	);

	return (
		<MapContext.Provider value={{
			map: state.map,
			markers: state.markers,
			searchReq: state.searchReq,
			userLocation: state.userLocation,
			report: state.report,
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
