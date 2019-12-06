
import loadGoogleMapsApi from 'load-google-maps-api';
// let API_KEY_MAP = process.env.API_KEY_MAP;

export class Map {

    async getMap(latitude, longitude, list) {
        loadGoogleMapsApi({'key': process.env.API_KEY_MAP}).then(function (googleMaps) {
            let currentMap = new googleMaps.Map(document.querySelector('.map'), {
                center: {
                    lat: latitude,
                    lng: longitude
                },
                zoom: 15
            });
            let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let labelIndex = 0;
            //current position
            let marker = new googleMaps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                title: "Your Position",
                label: 'YOU'
            });
            marker.setMap(currentMap);

            for (let i=0; i< list.length; i++) {
                let marker = new googleMaps.Marker({
                    position: {
                        lat: list[i].coordinates.latitude,
                        lng: list[i].coordinates.longitude
                    },
                    icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                    title: list[i].name,
                    label: labels[labelIndex++ % labels.length]
                });
                let ratingone;
                if(list[i].rating == "5"){
                    ratingone = '<div><img style="height:40px;width:150px;" src="./img/fivestarrating.png"/></div>';
                }
                if(list[i].rating == "4"){
                    ratingone = '<div><img style="height:40px;width:150px;" src="./img/fourstarrating.png"/></div>';
                }
                if(list[i].rating == "3"){
                    ratingone = '<div><img style="height:40px;width:150px;" src="./img/threestarrating.png"/></div>';
                }
                if(list[i].rating == "2"){
                    ratingone = '<div><img style="height:40px;width:150px;" src="./img/twostarrating.png"/></div>';
                }
                if(list[i].rating == "1"){
                    ratingone = '<div><img style="height:40px;width:150px;" src="./img/onestarrating.png"/></div>';
                }
                if(list[i].rating == ".5"){
                    ratingone = '<div><img style="height:30px;width:150px;" src="./img/halfstar.png"/></div>';
                }
                if(list[i].rating == "1.5"){
                    ratingone = '<div><img style="height:30px;width:150px;" src="./img/oneandhalfstar.png"/></div>';
                }
                if(list[i].rating == "2.5"){
                    ratingone = '<div><img style="height:30px;width:150px;" src="./img/twoandhalfstar.png"/></div>';
                }
                if(list[i].rating == "3.5"){
                    ratingone = '<div><img style="height:30px;width:150px;" src="./img/threeandhalfstar.png"/></div>';
                }
                if(list[i].rating == "4.5"){
                    ratingone = '<div><img style="height:30px;width:150px;" src="./img/fourandhalfstar.png"/></div>';
                }
                let infoForMarker = new googleMaps.InfoWindow({

                    content:`<h4>${list[i].name}</h4> ${ratingone}`
                });
                marker.addListener('click',function(){
                    infoForMarker.open(currentMap,marker);
                });
                marker.setMap(currentMap);
            }

        });

    }
}
