let API_KEY = process.env.API_KEY_YELP;
API_KEY  = 'DOjk8yslMwaED67UzeXSK5kOl32EnAVOh9Civ7EW31FhZhII0nn6SLEyufoVlHO4K3LV5_4Snb576BjCPpxsaYEzJCWn_hcX44BHftwVD8im7KD7Ed2LL1fJBGjlXXYx';
import yelp from 'yelp-fusion';
const client = yelp.client(API_KEY);

export class Attractions {
    async getAttractions(lat, lon, place) {
        const searchRequest = {
            term:place,
            latitude: lat,
            longitude: lon,
            radius: 1000,
            limit: 9
        };

        try {
            let resultArray = [];
            await client.search(searchRequest).then(response => {
                const results = response.jsonBody.businesses;
                //const prettyJson = JSON.stringify(results, null, 4);
                //console.log(prettyJson);
                for (let i=0; i < results.length; i++) {
                    let element = results[i];
                    let currentResult = {};
                    currentResult['id'] = element['id'];
                    currentResult['name'] = element['name'];
                    currentResult['address'] = element['location']['display_address'];
                    currentResult['phone'] = element['phone'];
                    currentResult['coordinates'] = element['coordinates'];
                    currentResult['distance'] = element['distance'];
                    currentResult['rating'] = element['rating'];
                    currentResult["image"] = element['image_url'];
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

    async getReview(id) {
        await client.reviews(id).then(response => {
            console.log(response.jsonBody.reviews[0].text);
        }).catch(error => {
            console.error("There was an error handling your request: " + error.message);
        });
    }
}