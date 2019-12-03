import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CoordinatesFromAddress} from './coordinatesFromLocation';
import { Map } from './googleMaps';
import {Attractions} from './yelp';

$(function() {
    let lat, lon, map;

    $("#findLocationForm").submit(function(event) {
        event.preventDefault();
        const location = $("#userLocationInput").val();    
        const place = $("#userAttractionInput").val();

        if (!location) {
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {
                    lat = position.coords.latitude;
                    lon=position.coords.longitude;
                    display(lat, lon, place)
                });
            } else {
                //Seattle coords
                lat = "47.608013";
                lon = "-122.335167";
                display(lat, lon, place);
            }
        } else {
            (async() => {
                try {
                    let coordinatesFromLocation = new CoordinatesFromAddress();
                    const response = await coordinatesFromLocation.getCoordinates(location);
                    lat = response.results[0].geometry.lat;
                    lon =  response.results[0].geometry.lng;
                    display(lat, lon, place);
                } catch(error) {
                    console.error("There was an error handling your request: " + error.message);
                    //Seattle coords
                    lat = "47.608013";
                    lon = "-122.335167";
                    display(lat, lon, place);
                }
            })();
        }
    });
    
    function display(lat, lon, place) {
        getListOfAttractions(lat,lon,place).then(function(response) {
            displayList(response);
            displayMap(lat, lon, response);

        })
    }

    async function getListOfAttractions(lat, lon, place) {
        try {
            let attractions = new Attractions();
            let listOfAttractions = await attractions.getAttractions(lat, lon, place); 
            return listOfAttractions;
        } catch(error) {
            console.error("There was an error handling your request: " + error.message);
        }
    }

    function displayList(list) {
        $("#results").empty();
        for (let i=0; i< list.length; i++) {
            const el = list[i];
            console.log(el);
            $("#results").append(`<li>${displayElementOfList(el)}</li>`);
        }
        $("#results").show();
    }

    function displayElementOfList(element) {
        return `${element.name}`
    }

    function displayMap(lat, lon, list) {
        $('.map').show();
        map = new Map();
        map.getMap(lat, lon, list);
        $("#box").addClass("goUpForm");
        $("#locationInput").addClass("goUpGroup");
        $("#attractionInput").addClass("goUpGroup");
    }
});