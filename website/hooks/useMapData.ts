import { useState, useEffect } from "react";
import { useApi } from "./useApi";
import { MapMarker } from "../context/MapContext";

export const useMapData = () =>
{
	const { getData } = useApi();
	const [data, setData] = useState<MapMarker[]>([]);

	const goGetIt = async () =>
	{
		const result = await getData({
			url: `/api/getIncidents`
		});

		setData(result);
	};

	useEffect(() =>
	{
		goGetIt();
	}, []);
	const countries = data == null ? [] : [...Array.from(new Set(data.map(datum => datum.country)))].sort();
	const states = (country: string) => (data == null
		? []
		: [...Array.from(new Set(data.filter(datum => datum.country === country).map(datum => datum.state)))].sort());

	return { data, countries, states, reload: () => goGetIt() };
};
