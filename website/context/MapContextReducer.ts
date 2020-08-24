import { IMapContextState, IMapContextDispatch, MapMarker } from "./MapContext";

export const SET_MARKERS = "Set map markers";
export const ADD_MARKERS = "Add map markers";
export const REMOVE_MARKER = "Remove map markers";
export const SET_GOOGLE_MARKERS = "Set Google map markers";
export const SET_SELECTED_MARKER = "Set selected map markers";
export const SET_CENTER = "Set map center";
export const SET_MAP = "Set map";
export const RESET = "Set contexts to values specified";

export const mapContextReducer = (state: IMapContextState, action: IMapContextDispatch): IMapContextState =>
{
	switch (action.type)
	{
		case SET_MARKERS:
		{
			return {
				...state,
				markers: action.value as MapMarker[] | null
			};
		}

		case ADD_MARKERS:
		{
			if (action.value == null)
			{
				return state;
			}

			return {
				...state,
				markers: state.markers == null
					? [...action.value as MapMarker[]]
					: [...state.markers, ...action.value as MapMarker[]]
			};
		}

		case REMOVE_MARKER:
		{
			if (state.markers == null)
			{
				return state;
			}
			const newMarkers = state.markers.filter((item: MapMarker) =>
			{
				if (
					(item.lat === (action.value as MapMarker).lat) &&
					(item.lon === (action.value as MapMarker).lon)
				)
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
				gmarkers: action.value as google.maps.Marker[] | null
			};
		}

		case SET_SELECTED_MARKER:
		{
			if (state.selectedMarker != null &&
				state.selectedMarker.lat == (action.value as MapMarker).lat &&
				state.selectedMarker.lon == (action.value as MapMarker).lon)
			{
				return {
					...state,
					selectedMarker: null
				};
			}
			return {
				...state,
				selectedMarker: action.value as MapMarker
			};
		}

		case SET_MAP:
		{
			return {
				...state,
				map: action.value as google.maps.Map | null
			};
		}

		case SET_CENTER:
		{
			return {
				...state,
				center: action.value as { lat: number, lng: number }
			};
		}

		case RESET:
		{
			return {
				...action.value as IMapContextState
			};
		}

		default:
			return state;
	}
};
