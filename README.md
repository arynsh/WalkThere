# _Walk There_

#### _Version 12/02/2019_

#### By _**Nina Potrebich, Sharon Lee, Adilet Momunaliev, Will Quanstrom**_

## Description

_A location based website that allows users to search attractions within walking distance of their location ._

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* NodeJS
* Go to the website https://opencagedata.com/api and get your own API key(YOUR_KEY).

### Installing

Create a `.env` file in the root of your project and insert your key/value pairs in the following format of `KEY=VALUE`:

```sh
API_KEY=YOUR_KEY( There are two API one for google map and second one for Yelp API)
```
After cloning the project:
1. npm install
2. npm install yelp-fusion --save
3. npm install --save load-google-maps-api
4. 1 Step: open => "node_module" folder in your project; 2 Step: drop down list and open => "yelpfusion" folder; 3 Step: open "lib" folder; 4 Step: open file        "index.js"; 5 Step: modify each original url 'https://api.yelp.com/v3/events/featured' with new one 'https://cors-anywhere.herokuapp.com/api.yelp.com/v3/events/featured'

```

Once the dependencies are installed (it will take a few minutes), your project is ready to go.:

```
npm run build
```

## Specifications:
* A user is able to either use their current location or input an address.
* If user left field empty the program will get data for their current location. (Allow your browser to use your location).
* The program wil display a map with a marker on the user's location.
* The user will able to choose from a variety of attractions (bars, restaurants, etc.).
* The program will display results within walking distance for the user based on their location and chosen attraction.


## Technologies Used

_HTML, CSS, jQuery, Bootstrap, JavaScript, NodeJS_

### License

*_Copyright (c) 2019 **Nina Potrebich, Sharon Lee, Adilet Momunaliev, Will Quanstrom**_*
