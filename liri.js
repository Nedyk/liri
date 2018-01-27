//require and configure dotenv
var config = require("dotenv").config();
//packages- twitter and spotify
var twit = require('twitter');
var spotifyapi = require('node-spotify-api');
var fs = require('fs');
//require keys
//console.log(config); 
 var keys = require("./keys")
//console.log(keys); 
//access keys
var client = new twit(keys.twitter);
//console.log(client)
var spotify = new spotifyapi(keys.spotify);
 //console.log(spotify);
 var action = process.argv[2];
var value = process.argv[3];

  //liri.js should be able to take in one of the following commands
  
  switch (action) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotified();
    break;

  case "movie-this":
    movies();
    break;

  case "do-what-it-says":
    saysIt();
    break;
}
  

//node liri.js my-tweets
  //This will show your last 20 tweets and when they were created at in your terminal/bash window
function tweets(){
 
//queryUrl = "https://api.twitter.com/1.1/statuses/mentions_timeline.json?count=2"

//get request
twit;
client.get('favorites/list', function(error, tweets, response) {
  var twitterUsername = process.argv[3];
    if(!value){
      value = "neddyk22";
    }
    params = {screen_name: value};
    client.get("statuses/user_timeline/", params, function(error, data, response){
      if (!error) {
        for(var i = 0; i < data.length; i++) {
          //console.log(response); // Show the full response in the terminal
          //console.log(JSON.stringify(data, undefined, 2));
          var twitterResults = 
          "@" + data[i].user.screen_name + ": " + 
          data[i].text + "\r\n" + 
          data[i].created_at + "\r\n" ;
          console.log(JSON.stringify(twitterResults, undefined, 2));
          
        }
      }  else {
        console.log("Error :"+ error);
        return;
      }



  if(error) {
    console.log(error)
  }
  

  
});

});
}


//node liri.js spotify-this-song '<song name here>'

//This will show the following information about the song in your terminal/bash window
      //Artist(s)
      //The song's name
      //A preview link of the song from Spotify
      //The album that the song is from
//If no song is provided then your program will default to "The Sign" by Ace of Base
function spotified(){
  
    if(!value){
      value = "The Sign";
    }
    
    spotify.search({ type: "track", query: value}, function(err, data) {
      if(!err){
        //console.log(JSON.stringify(data, undefined, 2));

        var songData = data.tracks.items;
        for (var i = 0; i < 1; i++) {
          if (songData[i] != undefined) {
            var spotifyResponse=
            "Artist(s): " + songData[i].artists[0].name+ "\r\n" +
            "Song name: " + songData[i].name + "\r\n" +
            "Album the song is from: " + songData[i].album.name + "\r\n" +
            "Preview Url from Spotify: " + songData[i].preview_url + "\r\n"; 
            
            console.log(spotifyResponse);
            
          }
        }
      } else {
        console.log("Error :"+ err);
        return;
      }
    });


}
  

function movies(){

// //GET movie details from omdb 

// //require 'request' package
var request = require("request");

//variables
var value = "";
var movie =[];
//store from command line
value = process.argv[3];

//API

var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(err, response, body) {
//if no error and status code is 200
  if(!err && response.statusCode === 200){
      if(!movie){
      movie = "mr nobody";
    }
    
  var year = JSON.parse(body).Year.split(",");
  movie.push("Year produced " + ": " + year);
  var rating = JSON.parse(body).imdbRating.split(" ,");
      movie.push("imdbRating " + ": " + rating);
    //var rotten = JSON.parse(body).RottenTomatoes.split(",");
      //movie.push(rotten);
    var country = JSON.parse(body).Country.split(",");
      movie.push("Country " + ": " + country);
    var language = JSON.parse(body).Language.split(",");
      movie.push("Language used in movie " + ":" + language);
    var plot = JSON.parse(body).Plot.split(",");
      movie.push("Plot " + ": " + plot);
    var actors = JSON.parse(body).Actors.split(",");
      movie.push("Actors " + ": " + actors);
  console.log(movie); 
}
});

}


function saysIt() {
   fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {

            console.log(JSON.stringify(data, undefined, 2));
            var g = data.split(','); 
            console.log(g);
          spotified(g[0]);
           
        }
    });
  }


function auditTrack() {     // captures all command line inputs     
 var valueinputs = process.argv.slice(2).join(" ");          
 fs.appendFile("log.txt", "node liri.js: " + valueinputs + "\n", function (error) {  
  if (error) {        
   throw error;       
             }      
  else {          
   console.log(" updated log file! ");       
       }  
 });     return true; 
