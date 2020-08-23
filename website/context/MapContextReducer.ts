import { IMapContextState, IMapContextDispatch } from "./MapContext";

export const SET_MARKERS = "Set map markers";
export const ADD_MARKERS = "Add map markers";
export const REMOVE_MARKER = "Remove map markers";
export const SET_GOOGLE_MARKERS = "Set Google map markers";
export const SET_SELECTED_MARKER = "Set selected map markers";
export const SET_CENTER = "Set map center";
export const SET_MAP = "Set map";

export const mapContextReducer = (state: IMapContextState, action: IMapContextDispatch): IMapContextState =>
{
	switch (action.type)
	{
		case SET_MARKERS:
		{
			return {
				...state,
				markers: action.value
			};
		}

		case ADD_MARKERS:
		{
			return {
				...state,
				markers: [...state.markers, ...action.value]
			};
		}

		case REMOVE_MARKER:
		{
			if (state.markers == null)
			{
				return state;
			}
			const newMarkers = state.markers.filter((item: any) =>
			{
				if ((item.lat === action.value.lat) && (item.lon === action.value.lon))
				{
					return false;
				}
				return true;
			});
			return {
				...state,
				markers: newMarkers
			};
		}

		case SET_GOOGLE_MARKERS:
		{
			return {
				...state,
				gmarkers: action.value
			};
		}

		case SET_SELECTED_MARKER:
		{
			if (state.selectedMarker != null &&
				state.selectedMarker.lat == action.value.lat &&
				state.selectedMarker.lon == action.value.lon)
			{
				return {
					...state,
					selectedMarker: null
				};
			}
			return {
				...state,
				selectedMarker: action.value
			};
		}

		case SET_MAP:
		{
			return {
				...state,
				map: action.value
			};
		}

		case SET_CENTER:
		{
			return {
				...state,
				center: action.value
			};
		}

		default:
			return state;
	}
};
