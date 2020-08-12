import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { IncidentMap } from "./IncidentMap";
import { ViewIncident } from "./ViewIncident";

export const Pages = ():JSX.Element =>
{
	return (
		<Switch>
			<Route path="/incidents" component={IncidentMap} />
			<Route path="/viewIncident" component={ViewIncident} />
			<Redirect from="/" exact to="/incidents" />
			{/* <Redirect from="/" to="/404" /> */}
		</Switch>
	);
};
