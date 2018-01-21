//require and configure dotenv
var config = require("dotenv").config();
//packages- twitter and spotify
var twit = require('twitter');
var spotifyapi = require('node-spotify-api');
//require keys
//console.log(config); 
 var keys = require("./keys")
//console.log(keys); 
//access keys
var client = new twit(keys.twitter);
//console.log(client)
var spotify = new spotifyapi(keys.spotify);
 //console.log(spotify);

  //liri.js should be able to take in one of the following commands
  var action = process.argv[2];
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
    if(!twitterUsername){
      twitterUsername = "neddyk22";
    }
    params = {screen_name: twitterUsername};
    client.get("statuses/user_timeline/", params, function(error, data, response){
      if (!error) {
        for(var i = 0; i < data.length; i++) {
          //console.log(response); // Show the full response in the terminal
          console.log(data);
          var twitterResults = 
          "@" + data[i].user.screen_name + ": " + 
          data[i].text + "\r\n" + 
          data[i].created_at + "\r\n" ;
          console.log(twitterResults);
          
        }
      }  else {
        console.log("Error :"+ error);
        return;
      }



  if(error) {
    console.log(error)
  }
  

  //console.log(tweets);
  //var fave = JSON.parse(body).description.split(" , ");

  //console.log(fave);  // Raw response object. 
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
  var song = process.argv[3];
    if(!song){
      song = "The Sign";
    }
    
    spotify.search({ type: "track", query: song}, function(err, data) {
      if(!err){
        console.log(data);

        var songData = data.tracks.items;
        for (var i = 0; i < 5; i++) {
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
//  var artist = process.argv[3]; 
//  if(!artist){
//    artist ="Beyonce"
//  }
//  var sportUrl = "https://api.spotify.com/v1/search?q=name:' + artist + '%20artist:' + artist + '&type=track&limit=10"
//   spotify.search(sportUrl, function(err, data){
//    if(!err){
//      console.log(data); 
//    }
// }); 

}
  
  
 
 



  

function movies(){

// //GET movie details from omdb 

// //require 'request' package
var request = require("request");

//variables
var movieName = "";
var movie =[];
//store from command line
movieName = process.argv[3];

//API

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(err, response, body) {
//if no error and status code is 200
  if(!err && response.statusCode === 200){
      if(!movie){
      movie = "mr nobody";
    }
  //var movieObject = console.log(JSON.parse(body));
  var year = JSON.parse(body).Year.split(",");
  console.log(year); 
  movie.push("Year produced " + ": " + year);
  var rating = JSON.parse(body).imdbRating.split(" ,");
      movie.push("imdbRating " + ": " + rating);
    //var rotten = JSON.parse(body).Rotten_Tomatoes.split(",");
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




//    var movieObject = JSON.parse(body);
//        //console.log(movieObject); // Show the text in the terminal
//        var movieResults =
//        "------------------------------ begin ------------------------------" + "\r\n"
//        "Title: " + movieObject.Title+"\r\n"+
//        "Year: " + movieObject.Year+"\r\n"+
//        "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
//        "Country: " + movieObject.Country+"\r\n"+
//        "Language: " + movieObject.Language+"\r\n"+
//        "Plot: " + movieObject.Plot+"\r\n"+
//        "Actors: " + movieObject.Actors+"\r\n"+
//        "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
//        "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
//        "------------------------------ fin ------------------------------" + "\r\n";
//        console.log(movieResults);
//        log(movieResults); // calling log function
//      } else {
//        console.log("Error :"+ error);
//        return;
//      }
// //     //grab specific fields from the body and push them to movie array 
// //       var year = JSON.parse(body).Year.split(",");
// //       movie.push("Year produced " + ": " + year);
  //    var rating = JSON.parse(body).imdbRating.split(" ,");
    //  movie.push("imdbRating " + ": " + rating);
    // //var rotten = JSON.parse(body).RottenTomatoes.split(",");
    //  //movie.push(rotten);
    // var country = JSON.parse(body).Country.split(",");
    //  movie.push("Country " + ": " + country);
    // var language = JSON.parse(body).Language.split(",");
    //  movie.push("Language used in movie " + ":" + language);
    // var plot = JSON.parse(body).Plot.split(",");
    //  movie.push("Plot " + ": " + plot);
    // var actors = JSON.parse(body).Actors.split(",");
    //  movie.push("Actors " + ": " + actors);

// // for(var i = 0; i < movie.length; i++){
// //   console.log(movie[i])
// });

//  

function saysIt(logForAudit) {
    fs.appendFile("audit.txt", logForAudit, (err) => {
      if(err) {
        console.log('error');
      }
    });
  }