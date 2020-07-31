
//Loads init() at startup
window.addEventListener('load', init, false);

function init() {
    /**Creates a second scope to "hide" code*/
      
    function map_obj(m, markers) {
        /**Stores the Leaflet map object*/
        this.created_map = m,
        this.markers = markers,
        this.markers_count = 0,

        get_map = function() {
            return this.created_map;
        }
    }

    function users_location() {
        /**Stores user location */
        this.lat = 0.0,
        this.lon = 0.0
    }

    function report(id, lat, lon, description, state, city, country) {
        /**This is where the report information will be stored for later use*/
        this.id = id,
        this.lat = lat,
        this.lon = lon,
        this.description = description,
        this.state = state,
        this.city = city,
        this.country = country
    }

    function request_query(country, state, city, from_time, to_time, from_date, to_date) {
        /**Request the document to MongoDB of the requested values by the user, initialize 
         * the object with that information, save it to a list of objects and return the list.
         * It needs to have at least Country and/or date selected to execute**/
        
        //Objects list or dictionary
        let reports = [];


        return reports;

    }

    function display_totals(country, state, city) {
        /**Iterates over the receive information of the object report for the information totals
         * by selected City,State, Country and total reported cases if applies*/
    }

    function update_map() {
        /**Update the leflet object with the acutal values of the query. Checks if the user selected 
         * the filters, and if so, calls function request_query(), and iterates over the object list
         * to pass values to display_totals() and place_marker() functions*/

        //map_obj.markers.remove();

    }

    function map(lat, lon) {
        /**Creates an empty  Leflet map and return the map object*/
        var mymap = L.map('mapid').setView([lat, lon], 4);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZGF2ZXp1bmlnYSIsImEiOiJja2Q2azJ1Y20wcWl2MnlvOGoxMDh3NWRoIn0.D3G8f1Y7ZFzaflnCItihgA'
        }).addTo(mymap);

        map_obj.created_map = mymap;

    }

    function place_marker(mymap, lat, lon) {
        /**Receives a Leflet map object, a latitud and longitud values to place markers on the map*/
        markers = L.marker([lat, lon])
            .bindPopup('<button id="event">Event reported</button>')
            .openPopup(); 

        map_obj.markers = markers;    
        map_obj.created_map.addLayer(markers);




    }

    function more_btn() {
        /**Ecxecutes on click and does a call for a full document information according to the ID*/
    }

    function start() {
        /**Initial functions executions*/
        get_location();
        map(39.79160533247704, -100.70268789896711);
        place_marker(map_obj.created_map, 39.79160533247704, -100.70268789896711);
        place_marker(map_obj.created_map, 39.99160533247704, -100.10268789896711);
    
    }

    function map_location(lat, lon) {
        /**Updates the focus zone of the map according to the users
         * location*/
        map_obj.created_map.flyTo(new L.LatLng(lat , lon));

    }
    function get_location() {
        /**Ask the user to allow app to get location to display the correct map location acoording to the users 
         * IP address using Mozilla Geolocation API. Executes only in first time access, and calls sucess and 
         * error functions if aplicable**/
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(success, error, options);

    }
    function success(pos) {
        /**Executes if the Geolocation is succesfull; and calls functions map() and update_map()*/
        var crd = pos.coords;

        map_location(crd.latitude, crd.longitude);
        update_map();
    }
    function error(err) {
        /**Executes if the Geoloction request is unssuccesfull. It displays a "Default" location 
         * for the user the first time calling functions map() and update_map()*/

         console.warn(`Unable to get location: (${err.code}): ${err.message}`);
    }
    
    start();
}
