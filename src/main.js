import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CoordinatesFromAddress} from './coordinatesFromLocation';
import loadGoogleMapsApi from 'load-google-maps-api';

$(function() {
    let lat, lon;

    $("#findLocationForm").submit(function(event) {
        event.preventDefault();
        const location = $("#userLocationInput").val();    
        if (!location) {
            if (navigator.geolocation) {
                
                navigator.geolocation.getCurrentPosition(function(position) {
                    lat = position.coords.latitude;
                    lon=position.coords.longitude;
                    console.log(lat, lon);
                });
            } else {
                //Seattle coords
                lat = "47.608013";
                lon = "-122.335167";
            }
        } else {
            (async() => {
                try {
                    let coordinatesFromLocation = new CoordinatesFromAddress();
                    const response = await coordinatesFromLocation.getCoordinates(location);
                    lat = response.results[0].geometry.lat;
                    lon =  response.results[0].geometry.lng;
                    console.log(lat, lon);

                } catch(error) {
                    console.error("There was an error handling your request: " + error.message);
                    //Seattle coords
                    lat = "47.608013";
                    lon = "-122.335167";
                    console.log(lat, lon);
                }

            })();
        }
    });


});
