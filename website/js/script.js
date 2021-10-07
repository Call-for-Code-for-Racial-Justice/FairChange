
const UPDATE_MAP_DEFAULT_RADIUS = 6;
const L = null;

function init()
{

	/**Creates a second scope to "hide" code*/
	class MapObj
	{
		constructor(m, markers)
		{
			//Stores the Leaflet map object
			this.createdMap = m;
			this.markers = markers;
			this.markersCount = 0;
		}

		get map()
		{
			return this.createdMap;
		}

		get markers()
		{
			const mark = [];
			mark.push(this.markers);

			return mark;
		}
	}

	class SearchReq
	{
		constructor(country, state, dateFrom, dateTo)
		{
			this.coutnry = country;
			this.state = state;
			this.dateFrom = dateFrom;
			this.dateTo = dateTo;
			this.total = 0;
		}
	}

	class UsersLocation
	{
		constructor()
		{

			/**Stores user curent location */
			this.lat = 0.0;
			this.lon = 0.0;
			this.radius = 2.0;
		}
	}

	class Report
	{
		constructor(id, lat, lon, description, state, city, country, date, time)
		{

			/**This is where the report information will be stored for later use*/
			this.id = id;
			this.lat = lat;
			this.lon = lon;
			this.description = description;
			this.state = state;
			this.city = city;
			this.country = country;
			this.date = date;
			this.time = time;
		}
	}

	function placeMarker(lat, lon, des)
	{

		/**Receives a Leflet map object, a latitud and longitud values to place markers on the map*/
		const markers = L.marker([lat, lon]).
			bindPopup(`<a href="#" id="event">${des}</a>`).
			openPopup();

		MapObj.markers = markers;
		markers.addTo(MapObj.map);
		//MapObj.map.addLayer(markers);
		SearchReq.total++;

	}

	function map(lat, lon)
	{

		/**Creates an empty  Leflet map and return the map object*/
		const mymap = L.map('mapid').setView([lat, lon], 6);

		const layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			zoomAnimation: false,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1IjoiZGF2ZXp1bmlnYSIsImEiOiJja2RqZWR2YnQwMGN5MnF0MnlzbzR6N2RkIn0.IbVbFPrE6cCQxt1rNW-bIQ'
		});

		mymap.addLayer(layer);
		MapObj.map = mymap;

	}

	function updateMap(isSearch, radius)
	{

		/**Update the leflet object with the actual values of the query*/
		let loc = false;
		let latMax = null,
			latMin = null,
			lonMax = null,
			lonMin = null;

		UsersLocation.radius = radius;

		if (isSearch)
		{
			latMax = UsersLocation.lat + UsersLocation.radius;
			latMin = UsersLocation.lat - UsersLocation.radius;
			lonMax = (UsersLocation.lon * -1) - UsersLocation.radius;
			lonMin = (UsersLocation.lon * -1) + UsersLocation.radius;
		}

		SearchReq.total = 0;

		for (const i in Report.lat)
		{
			if (Report.lat[i] <= latMax &&
				Report.lat[i] >= latMin &&
				(Report.lon[i] * -1) > lonMax &&
				(Report.lon[i] * -1) < lonMin &&
				isSearch == false)
			{
				if (loc == false)
				{
					MapObj.map.remove();
					map(UsersLocation.lat, UsersLocation.lon);
					UsersLocation.radius = radius;
					loc = true;

				}

				placeMarker(Report.lat[i], Report.lon[i], Report.description[i]);

			}
			else if (isSearch == false)
			{
				if (loc == false)
				{
					MapObj.map.remove();
					map(UsersLocation.lat, UsersLocation.lon);
					loc = true;
				}

				placeMarker(Report.lat[i], Report.lon[i], Report.description[i]);

			}
			else if (isSearch)
			{
				if (Report.country[i] == SearchReq.country)
				{
					if (loc == false)
					{
						UsersLocation.lon = Report.lon[i];
						UsersLocation.lat = Report.lat[i];

						MapObj.map.remove();
						map(Report.lat[i], Report.lon[i]);

						loc = true;
					}

					placeMarker(Report.lat[i], Report.lon[i], Report.description[i]);

				}


			}
		}

		//console.log(SearchReq.total);

		if (SearchReq.total == 0)
		{
			alert('No reports for the selected location'); // eslint-disable-line no-alert
		}

		SearchReq.total = 0;

	}

	function start()
	{

		/**Initial functions executions*/
		UsersLocation.lat = 39.79160533247704;
		UsersLocation.lon = -100.70268789896711;

		map(UsersLocation.lat, UsersLocation.lon);
		updateMap(false, 6);
	}

	function mapLocation(lat, lon)
	{

		/**Updates the focus zone of the map according to the users
         * location*/
		MapObj.map.flyTo(new L.LatLng(lat, lon), 6);

	}

	function success(pos)
	{

		/**Executes if the Geolocation is succesfull; and calls functions map() and updateMap()*/
		const crd = pos.coords;

		UsersLocation.lat = crd.latitude;
		UsersLocation.lon = crd.longitude;
		mapLocation(UsersLocation.lat, UsersLocation.lon);
		setTimeout(() =>
		{
			updateMap(false, UPDATE_MAP_DEFAULT_RADIUS);
		}, 1500);
	}

	function error(err)
	{

		/**Executes if the Geoloction request is unssuccesfull. It displays a "Default" location
         * for the user the first time calling functions map() and updateMap()*/

		console.warn(`Unable to get location: (${err.code}): ${err.message}`);
	}

	function getLocation()
	{

		/**Ask the user to allow app to get location to display the correct map location acoording to the users
         * IP address using Mozilla Geolocation API. Executes only in first time access, and calls sucess and
         * error functions if aplicable**/
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		navigator.geolocation.getCurrentPosition(success, error, options);

	}

	function getFilters()
	{

		/**Get HTML input values for the search*/
		const country = document.getElementById("country");
		const state = document.getElementById("state");

		SearchReq.country = country.value;
		SearchReq.state = state.value;
	}

	function search()
	{

		/**Does search acoording to elected filters on search button click */
		let startSearch = true;
		getFilters();

		if (SearchReq.state)
		{
			for (const i in Report.lat)
			{
				if (SearchReq.state == Report.state[i])
				{
					if (startSearch)
					{
						startSearch = false;
						document.getElementById("state").selectedIndex = 0;
						MapObj.map.remove();
						map(Report.lat[i], Report.lon[i]);

					}
					placeMarker(Report.lat[i], Report.lon[i], Report.description[i]);
				}
			}
		}
		else
		{
			updateMap(true, UPDATE_MAP_DEFAULT_RADIUS);
		}


	}

	function locationSearch()
	{

		/**Does search by geo-location of the user on locations_search button click */
		document.getElementById("country").selectedIndex = 0;
		document.getElementById("state").selectedIndex = 0;
		getFilters();

		getLocation();
		//updateMap(false, 6);

	}

	start();

	document.getElementById('search').addEventListener('click', search);
	document.getElementById('location_search').addEventListener('click', locationSearch);


}

//Loads init() function at startup
window.addEventListener('load', init, false);
