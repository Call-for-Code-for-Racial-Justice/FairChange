import React from 'react';
import ReactDOM from 'react-dom';
import "./app.scss";
import { MainContentArea } from './components/common/MainContentArea';
import { BrowserRouter } from 'react-router-dom';
import { MapContextProvider } from './context/MapContext';
const googleMapsApiKey = "";


const App = () =>
{
	return (
		<BrowserRouter>
			<MapContextProvider googleMapsApiKey={googleMapsApiKey}>
				<MainContentArea />
			</MapContextProvider>
		</BrowserRouter>
	);
};

document.addEventListener("DOMContentLoaded", () =>
{
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById("root")
	);
});
