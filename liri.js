// import mods and packages
var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var cTable = require("console.table");
var fs = require("fs");

// turn on dotenv to load up environment variables from .env file
require("dotenv").config();

const spotifyKeys = require("./keys.js");

// turn on new spotify app
var spotify = new Spotify(spotifyKeys.spotify);

// node liri.js
var action = process.argv[2];
var value = process.argv[3];

console.log("Try the commands: 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'");

// function switchCase() {
//   switch(action){

//     case "concert-this":
//     bandsInTown();
//     break;

//     case "spotify-this-song":
//     getSong();
//     break;

//     case "movie-this":
//     getMovie();
//     break;

//     case "do-what-it-says":
//     doAsTold();
//     break;
//   }
// };
// Can't get switchCase to work for some reason..

if (action === "concert-this") {
  bandsInTown();
}
else if (action === "spotify-this-song") {
  getSong();
}
else if (action === "movie-this") {
  getMovie();
}
else if (action === "do-what-it-says") {
  doAsTold();
}


function bandsInTown() {

  var artist = process.argv.slice(3).join(" ")
  console.log(artist);

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  request(queryURL, function (error, response, body) {
    if (error) console.log(error);
    var result = JSON.parse(body)[0];
    console.log("Venue name " + result.venue.name);
    console.log("Venue location " + result.venue.city);
    console.log("Date of Event " + moment(result.datetime).format("MM/DD/YYYY"));
  });

  // var searchBand;

  // if (value === undefined) {
  //   console.log("Please enter a band name");
  //   return false;
  // }
  // else {
  //   searchBand = value;
  // }

  // spotify.search({type:'artist', query:searchBand, limit: 20}, function(err,data){
  //   if(err) {
  //     console.log("Error occurred: " + err)
  //     return;
  //   }
  //   else {

  //     var json = JSON.parse(data);

  //     console.log(json);
  //   }
  // })

}

function getSong() {

  var songName = process.argv.slice(3).join(" ");

  if (songName === undefined) {
    songName = "The Sign By Ace of Base";
  }

  spotify.search({ type: "track", query: songName, limit: 15 }, function (err, data) {

    if (err) {
      return console.log("Error occurred: " + err);
    }

    var tableArray = [];

    for (var i = 0; i < data.tracks.items.length; i++) {
      var result = {
        artist: data.tracks.items[i].album.artists[0].name,
        album_name: data.tracks.items[i].album.name,
        song_name: data.tracks.items[i].name,
        preview_url: data.tracks.items[i].preview_url
      }
      tableArray.push(result);
    }

    var table = cTable.getTable(tableArray);

    console.log(table);

  })

};

function getMovie() {

  var movieName = process.argv.slice(3).join(" ");

  if (movieName === undefined) {
    movieName = "Mr. Nobody";
  }

  request("http://www.omdbapi.com/?i=tt3896198&apikey=trilogy&t=" + value, function (err, response, body) {

    var result = JSON.parse(body);
    console.log("Title: " + result.Title)
    console.log("Year: " + result.Released)
    console.log("IMDB Rating: " + result.imdbRating)
    console.log("Rotten Tomatoes Rating: " + result.Ratings[1].value)
    console.log("Country: " + result.Country)
    console.log("Language: " + result.Language)
    console.log("Plot: " + result.Plot)
    console.log("Actors: " + result.Actors)

  })

};

function doAsTold() {

  console.log("reading text from random.txt and executing command(s)");
  fs.readFile("random.txt", "utf8", function(err,data) {
    if(err) {
      return console.log(err)
    }

    getSong(data);
  })
  // honestly i just ran out of time here..
}