let API_KEY = process.env.API_KEY_YELP;
API_KEY  = 'DOjk8yslMwaED67UzeXSK5kOl32EnAVOh9Civ7EW31FhZhII0nn6SLEyufoVlHO4K3LV5_4Snb576BjCPpxsaYEzJCWn_hcX44BHftwVD8im7KD7Ed2LL1fJBGjlXXYx';
import yelp from 'yelp-fusion';

export class Attractions {
    async getAttractions(lat, lon, place) {
        const searchRequest = {
            term:place,
            latitude: lat,
            longitude: lon,
            radius: 1000,
            limit: 10
        };

        try {
            const client = yelp.client(API_KEY);
            let resultArray = [];
            await client.search(searchRequest).then(response => {
                const results = response.jsonBody.businesses;
                //const prettyJson = JSON.stringify(results, null, 4);
                for (let i=0; i < results.length; i++) {
                    let element = results[i];
                    let currentResult = {};
                    currentResult['name'] = element['name'];
                    currentResult['address'] = element['location']['display_address'];
                    currentResult['phone'] = element['phone'];
                    currentResult['coordinates'] = element['coordinates'];
                    currentResult['distance'] = element['distance'];
                    resultArray.push(currentResult);
                }
            }).catch(e => {
                console.log(e);
            });
            return resultArray;
        } catch(error) {
            console.error("There was an error handling your request: " + error.message);
        }
    }
}