import React from "react";
import { Pages } from "../pages/Pages";
import styles from "./MainContentArea.module.scss";

export const MainContentArea = (): JSX.Element =>
{
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
						<button className="btn ctrl_btns" id="location_search">
							Search in my current location
						</button>
					</div>

					<div style={{ margin: "0 auto", width: "90%" }}>
						<ul className="topics">
							<li data-nav-id="/customisation/" className="dd-item" style={{ display: "block" }}>
								<span className="text">Location</span>
							</li>
						</ul>

						<script type="text/javascript" src="js/countries.js"></script>
						<select className="drop_down" id="country" name="country" style={{ width: "100%" }}></select>
						<select className="drop_down" name="state" id="state" style={{ width: "100%" }}></select>
					</div>

					<section id="shortcuts"style={{ margin: "0 auto", width: "90%" }}>
						<button id="search" className="ctrl_btns btn btn-outline-success my-2 my-sm-0">Search</button>
						<br/>
						<br/>
						<h3>More</h3>
						<ul className={styles.list}>
							<li><a href="#" target="_blank" rel="noopener">Information</a></li>
							<li><a href="https://github.com/embrace-call-for-code/fairchange/blob/master/readme.txt" target="_blank" rel="noopener">About</a></li>
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
