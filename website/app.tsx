import React from 'react';
import ReactDOM from 'react-dom';
import "./app.scss";
import { MainContentArea } from './components/common/MainContentArea';
import { BrowserRouter } from 'react-router-dom';

const App = () =>
{
	return (
		<BrowserRouter>
			<MainContentArea />
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
