import loadGoogleMapsApi from 'load-google-maps-api';
const API_KEY_MAP = 'AIzaSyB-Mgt8OR12z9WUmehS8HIQoCq_ItoMV_U';

export class Map {

    async getMap(latitude, longitude) {
        loadGoogleMapsApi({'key': API_KEY_MAP}).then(function (googleMaps) {
            new googleMaps.Map(document.querySelector('.map'), {
                center: {
                    lat: latitude,
                    lng: longitude
                },
                zoom: 12
            });
        });
    }
}