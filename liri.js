// import mods and packages
const request = require("request");
const spotify = require("node-spotify-api");
const moment = require("moment");

// turn on dotenv to load up environment variables from .env file
require ("dotenv").config();

const spotifyKeys = require("./keys.js");

// turn on new spotify app
var spotify = new spotify(spotifyKeys.spotify);