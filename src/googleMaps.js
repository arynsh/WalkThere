
import loadGoogleMapsApi from 'load-google-maps-api';
let API_KEY_MAP = process.env.API_KEY_MAP;
API_KEY_MAP = 'AIzaSyB-Mgt8OR12z9WUmehS8HIQoCq_ItoMV_U';

export class Map {

    async getMap(latitude, longitude, list) {
        loadGoogleMapsApi({'key': API_KEY_MAP}).then(function (googleMaps) {
            let currentMap = new googleMaps.Map(document.querySelector('.map'), {
                center: {
                    lat: latitude,
                    lng: longitude
                },
                zoom: 15
            });
            let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let labelIndex = 0;

            for (let i=0; i< list.length; i++) {
                let marker = new googleMaps.Marker({
                    position: {
                        lat: list[i].coordinates.latitude,
                        lng: list[i].coordinates.longitude
                    },
                    title: list[i].name,
                    label: labels[labelIndex++ % labels.length]
                });
                marker.setMap(currentMap);
            }

        });

    }
}