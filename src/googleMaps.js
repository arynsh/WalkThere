
import loadGoogleMapsApi from 'load-google-maps-api';
let API_KEY_MAP = process.env.API_KEY_MAP;
API_KEY_MAP = 'AIzaSyB-Mgt8OR12z9WUmehS8HIQoCq_ItoMV_U';

export class Map {

    async getMap(latitude, longitude) {
        loadGoogleMapsApi({'key': API_KEY_MAP}).then(function (googleMaps) {
            let currentMap = new googleMaps.Map(document.querySelector('.map'), {
                center: {
                    lat: latitude,
                    lng: longitude
                },
                zoom: 12
            });

            let marker = new googleMaps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                title: "Center of Map"
            })
            marker.setMap(currentMap);
        });

    }
}