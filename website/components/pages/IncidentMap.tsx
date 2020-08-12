import React from "react";
import styles from "./IncidentMap.module.scss";

export const IncidentMap = (): JSX.Element =>
{
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
