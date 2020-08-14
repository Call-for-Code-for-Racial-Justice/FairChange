import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { IncidentMap } from "./IncidentMap";
import { ViewIncident } from "./ViewIncident";
import { MapContextProvider } from '../../context/MapContext';

export const Pages = ():JSX.Element =>
{
	return (
		<MapContextProvider>
			<Switch>
				<Route path="/incidents" component={IncidentMap} />
				<Route path="/viewIncident" component={ViewIncident} />
				<Redirect from="/" exact to="/incidents" />
				{/* <Redirect from="/" to="/404" /> */}
			</Switch>
		</MapContextProvider>
	);
};
