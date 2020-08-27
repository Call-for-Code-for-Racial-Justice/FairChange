import React, { ChangeEvent, useState, useEffect } from "react";
import { Pages } from "../pages/Pages";
import styles from "./MainContentArea.module.scss";
import { Link } from "react-router-dom";
import { useMapContext, SET_MARKERS, SET_CENTER } from "../../context/MapContext";
import { useMapData } from '../../hooks/useMapData';
import { searchByCountryState, getCenter, searchRadius } from "./MapUtils";

export const MainContentArea = (): JSX.Element =>
{
	const { data, countries, states } = useMapData();
	const [selectedState, setSelectedState] = useState<string>(countries[0] || "");
	const [selectedCountry, setSelectedCountry] = useState<string>("");

	const setCountry = (ev: ChangeEvent<HTMLSelectElement>): void =>
	{
		setSelectedCountry(ev.target.value);
		setSelectedState("");
	};

	const setState = (ev: ChangeEvent<HTMLSelectElement>): void =>
	{
		setSelectedState(ev.target.value);
	};

	const { dispatch } = useMapContext();
	const getLocation = () =>
	{

		/**Ask the user to allow app to get location to display the correct map location acoording to the users
         * IP address using Mozilla Geolocation API. Executes only in first time access, and calls sucess and
         * error functions if aplicable**/
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		const setLocation = (pos: Position) =>
		{
			const markers = searchRadius(data, pos?.coords?.latitude, pos?.coords?.longitude, 10);

			dispatch({
				type: SET_CENTER,
				value: {
					lat: pos?.coords?.latitude,
					lng: pos?.coords?.longitude
				}
			});

			dispatch({
				type: SET_MARKERS,
				value: markers
			});
		};

		navigator.geolocation.getCurrentPosition(setLocation, (err) => console.warn(`Unable to get location: (${err.code}): ${err.message}`), options);

	};

	const search = () =>
	{
		const currentMarkers = searchByCountryState(data, selectedCountry, selectedState);
		dispatch({
			type: SET_MARKERS,
			value: currentMarkers
		});

		dispatch({
			type: SET_CENTER,
			value: getCenter(currentMarkers)
		});
	};

	return (
		<>
			<div id="headermain"></div>
			<nav id="sidebar" className="">
				<div className="highlightable">
					<div id="header-wrapper">
						<div id="header">
							<img style={{ height: "30%", width: "55%" }} src="img/IBM_logo.gif" alt="IBM Logo" />
						</div>
					</div>

					<p className="text">Search filters:</p>

					<div style={{ margin: "0 auto", width: "90%" }}>
						<button className="btn ctrl_btns" id="location_search" onClick={getLocation}>
							Search in my current location
						</button>
					</div>

					<div style={{ margin: "0 auto", width: "90%" }}>
						<ul className="topics">
							<li data-nav-id="/customisation/" className="dd-item" style={{ display: "block" }}>
								<span className="text">Location</span>
							</li>
						</ul>

						<select
							className="drop_down"
							id="country"
							name="country"
							style={{ width: "100%" }}
							value={selectedCountry}
							onChange={setCountry}
						>
							<option value="">-- Please Select --</option>
							{
								countries.map((item, index) => (
									<option value={item} key={`country-${index}`}>{item}</option>
								))
							}
						</select>
						<select
							className="drop_down"
							name="state"
							id="state"
							style={{ width: "100%" }}
							value={selectedState}
							onChange={setState}
						>
							<option value="">-- Please Select --</option>
							{
								states(selectedCountry).map((item, index) => (
									<option value={item} key={`state-${index}`}>{item}</option>
								))
							}
						</select>
					</div>

					<section id="shortcuts"style={{ margin: "0 auto", width: "90%" }}>
						<button
							id="search"
							className="ctrl_btns btn btn-outline-success my-2 my-sm-0"
							onClick={search}
						>
							Search
						</button>
						<br/>
						<br/>
						<h3>More</h3>
						<ul className={styles.list}>
							<li><Link to="/incidents">Incident Map</Link></li>
							<li><Link to="/viewIncident">Information</Link></li>
							<li><a href="https://github.com/embrace-call-for-code/fairchange/blob/master/readme.md" target="_blank" rel="noopener">About</a></li>
						</ul>
					</section>

					<hr/>
					<section style={{ backgroundColor: "#001a66" }} id="footer">
					</section>
				</div>
			</nav>

			<section id="body">
				<Pages/>
			</section>
		</>
	);
};
