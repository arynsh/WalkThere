import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CoordinatesFromAddress} from './coordinatesFromLocation';
import { Map } from './googleMaps';

$(function() {
    let lat, lon, map;

    $("#findLocationForm").submit(function(event) {
        event.preventDefault();
        const location = $("#userLocationInput").val();    
        //const place = $("#userAttractionInput").val();

        if (!location) {
            if (navigator.geolocation) {
                
                navigator.geolocation.getCurrentPosition(function(position) {
                    lat = position.coords.latitude;
                    lon=position.coords.longitude;
                    displayMap(lat, lon);
                });
            } else {
                //Seattle coords
                lat = "47.608013";
                lon = "-122.335167";
                displayMap(lat, lon);
            }
        } else {
            (async() => {
                try {
                    let coordinatesFromLocation = new CoordinatesFromAddress();
                    const response = await coordinatesFromLocation.getCoordinates(location);
                    lat = response.results[0].geometry.lat;
                    lon =  response.results[0].geometry.lng;
                    displayMap(lat, lon);
                } catch(error) {
                    console.error("There was an error handling your request: " + error.message);
                    //Seattle coords
                    lat = "47.608013";
                    lon = "-122.335167";
                    displayMap(lat, lon);
                }
            })();
        }
    });

    function displayMap(lat, lon) {
        $('.map').show();
        map = new Map();
        map.getMap(lat, lon);
    }
});
