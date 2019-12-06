import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CoordinatesFromAddress} from './coordinatesFromLocation';
import { Map } from './googleMaps';
import {Attractions} from './yelp';
import firebase from 'firebase';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';

$(function() {
    let lat, lon, map;

    $("#findLocationForm").submit(function(event) {
        event.preventDefault();
        const location = $("#userLocationInput").val();    
        const place = $("#userAttractionInput").val();

        if (!location) {
          //if input field is empty get current user location
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {
                    lat = position.coords.latitude;
                    lon=position.coords.longitude;
                    display(lat, lon, place);
                });
            } else {
                //Seattle coords
                lat = "47.608013";
                lon = "-122.335167";
                display(lat, lon, place);
            }
        } else {
          //get coords from user input
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
            $('.addButton').hide();
            displayMap(lat, lon, response);
        });
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
        $(".resultBox").show();
        $(".card-content").empty();
        $(".card-image").empty();
        let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let labelIndex = 0;
        for (let i=0; i< list.length; i++) {
            const el = list[i];
            $(".row").show();
            $("#row").append(`
            <div class="place" id=${i}>
              <div class="card results">
                <div class="card-image">
                  <img src="${el.image}" width="320px" height="270px">
                  <span class="card-title">${el.name}</span>
                  <a class="btn-floating halfway-fab waves-effect waves-light red addButton"><i class="material-icons">add</i></a>
                  <a class="btn-floating halfway-fab waves-effect waves-light blue left top"><i class="material-icons">${labels[labelIndex++ % labels.length]}</i></a>
                </div>
                <div class="card-text content">
                  ${displayElementOfList(el)}
                </div> 
               </div>
             </div>`);  

            
          
        }
        if (auth != null) {
          $(".addButton").show();
        }

        $(".addButton").click(function(event) {
          const data = list[$(event.target).parent().parent().parent().parent().attr('id')];
          console.log($(event.target).parent().parent().parent().parent().attr("id"));
          if( auth != null ){
              placesRef.child(auth.uid)
                .push({
                  name: data.name,
                  address: data.address,
                  coords: {
                    latitude: data.coordinates.latitude,
                    longitude: data.coordinates.longitude
                  },
                  phone: data.phone,
                  id: data.id,
                  image: data.image,
                  rating: data.rating
                });
          } else {
            //inform user to login
          }
        });
    }

    function displayElementOfList(element) {
        return `
            Address: ${element.address}<br>
            Phone: ${element.phone}<br>
            Rating: ${element.rating}<br>
           `;
    }

    function displayMap(lat, lon, list) {
      console.log($(".map"));
      $('.map').show();
      map = new Map();
      map.getMap(lat, lon, list);
      $("#box").addClass("goUpForm");
      $("#locationInput").addClass("goUpGroup");
      $("#attractionInput").addClass("goUpGroup");
    }

    // show/hide info about place
    $(".resultBox").click(function(event) {
        $(event.target).children("div").toggle();
    });

      //initialize the firebase app
    var config = {
        apiKey: process.env.API_KEY_DB,
        authDomain: "mapsapi-1574360837491.firebaseapp.com",
        databaseURL: "https://mapsapi-1574360837491.firebaseio.com",
        projectId: "mapsapi-1574360837491",
        storageBucket: "mapsapi-1574360837491.appspot.com",
        messagingSenderId: "800507194590",
        appId: "1:800507194590:web:bf61ca8b96a60a7081a64f",
        measurementId: "G-JZRSHZ15VP"
      };
    firebase.initializeApp(config);

    //create firebase references
    var Auth = firebase.auth(); 
    var dbRef = firebase.database();
    var placesRef = dbRef.ref('places');
    var usersRef = dbRef.ref('users');
    var auth = null;

     //Register
  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    $('#registerModal').modal('hide');
    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');
    var data = {
      email: $('#registerEmail').val(), //get the email from Form
      firstName: $('#registerFirstName').val(), // get firstName
      lastName: $('#registerLastName').val(), // get lastName
    };
    var passwords = {
      password : $('#registerPassword').val(), //get the pass from Form
      cPassword : $('#registerConfirmPassword').val(), //get the confirmPass from Form
    };
    if( data.email != '' && passwords.password != ''  && passwords.cPassword != '' ){
      if( passwords.password == passwords.cPassword ){
        //create the user
        
        Auth
          .createUserWithEmailAndPassword(data.email, passwords.password)
          .then(function() {
              let user = Auth.currentUser;
            return user.updateProfile({
              displayName: data.firstName + ' ' + data.lastName
            });
          })
          .then(function(){
            let user = Auth.currentUser;
            //now user is needed to be logged in to save data
            auth = user;
            //now saving the profile data
            usersRef.child(user.uid).set(data)
              .then(function(){
                console.log("User Information Saved:", user.uid);
              });
            $('#messageModalLabel').html(spanText('Success!', ['center', 'success']));
            
            $('#messageModal').modal('hide');
            $('.user-name').text(user.displayName);
          })
          .catch(function(error){
            console.log("Error creating user:", error);
            $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']));
          });
      } else {
        //password and confirm password didn't match
        $('#messageModalLabel').html(spanText("ERROR: Passwords didn't match", ['danger']));
      }
    }  
  });

  //Login
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    $('#loginModal').modal('hide');
    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');

    if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
      //login the user
      var data = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
      };
      Auth.signInWithEmailAndPassword(data.email, data.password)
        .then(function(authData) {
          auth = authData;
          $('#messageModalLabel').html(spanText('Success!', ['center', 'success']));
          $('#messageModal').modal('hide');
          $(".addButton").show();
        })
        .catch(function(error) {
          console.log("Login Failed!", error);
          $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']));
        });
    }
  });

  $('#logout').on('click', function(e) {
    e.preventDefault();
    Auth.signOut();
  });

  Auth.onAuthStateChanged(function(user) {
    if (user) {
      auth = user;
      $('.auth').removeClass('auth-false').addClass('auth-true');
      usersRef.child(user.uid).once('value').then(function (data) {
        if(user.displayName) {
          $('.user-info img').hide();
          $('.user-name').text(user.displayName);
        } else {
          $('.user-info img').hide();
          $('.user-name').text("User");
        }
        $(".addButton").show();
      });
      placesRef.child(user.uid).on('child_added', onChildAdd);
    } else {
      // No user is signed in.
      $('.auth').removeClass('auth-true').addClass('auth-false');
      $(".addButton").hide();
       auth && placesRef.child(auth.uid).off('child_added', onChildAdd);
      $('#savedPlacesList').html('');
      auth = null;
    }
  });

  $("#savedPlacesList").click(function(event) {
    if ($(event.target).is(":button")) {
      let element = $(event.target).parent().parent();
      console.log(element);
      console.log(placesRef.child(auth.uid).child(element.attr("id")));
      element.remove();
      placesRef.child(auth.uid).child(element.attr("id")).remove();
    }
  });

});

  function onChildAdd (snap) {
    $('#savedPlacesList').append(contactHtmlFromObject(snap.key, snap.val()));
  }
 
  //prepare contact object's HTML
  function contactHtmlFromObject(key, place){
    return '<div class="card contact" id="'+key+'">'
      + '<div class="card-body">'
        + '<h5 class="card-title">'+place.name+'</h5>'
         + '<h6 class="card-subtitle mb-2 text-muted">'+place.address+'</h6>'
         + '<p class="card-text">'
          + place.phone
        + '</p>'
        + '<p class="card-text">Rating: '
          + place.rating
        + '</p>'
        + '<button class="btn btn-danger deleteButton">Delete</button>'

        // + '<a href="#" class="card-link">Card link</a>'
        // + '<a href="#" class="card-link">Another link</a>'
      + '</div>'
    + '</div>';
  }

  function spanText(textStr, textClasses) {
    var classNames = textClasses.map(c => 'text-'+c).join(' ');
    return '<span class="'+classNames+'">'+ textStr + '</span>';
}
