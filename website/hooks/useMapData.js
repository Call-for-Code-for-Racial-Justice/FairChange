import { useMapContext } from "../context/MapContext";

export const useMapData = data =>
{
	const countries = data == null ? [] : [...Array.from(new Set(data.map(datum => datum.country)))].sort();
	const states = (country) => (data == null
		? []
		: [...Array.from(new Set(data.filter(datum => datum.country === country).map(datum => datum.state)))].sort());

	return { countries, states };
};
