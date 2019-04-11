require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require('request');
var fs = require('fs');

// To look for an artist, we do the following:
var getArtist = function (artist) {
    return artist.name;
}

// To search for a track on spotify
var getSpotify = function (songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtist));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('------------------------------------------------');
        }
    });
};

var getMovie = function (movieName) {
    request('http://www.omdbapi.com/?apikey=8465bed8&t=' + movieName, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred

        var jsonData = JSON.parse(body);
        console.log('Title: ' + jsonData.Title);
        console.log('Year: ' + jsonData.Year);
        console.log('Rated: ' + jsonData.Rated);
        console.log('IMDB Rating' + jsonData.imdbRating);
        console.log('Country: ' + jsonData.Country);
        console.log('Language: ' + jsonData.Language);
        console.log('Plot: ' + jsonData.Plot);
        console.log('Actors: ' + jsonData.Actors);
        console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
        console.log('Rotten Tomatoes URL: ' + jsonData.tomatoURL);
    });

}

var doWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');
        if (dataArr.length == 2) {
            choose(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            choose(dataArr[0]);
        }
    });
}

// data1 is 
var choose = function (data1, data2) {
    switch (data1) {
        case 'spotify-this-song':
            getSpotify(data2);
            break;
        case 'movie-this':
            getMovie(data2)
            break;
        case 'do-what-it-says':
            doWhatItSays(data2);
            break;
        default:
            console.log("Sorry, I do not know what you're looking for.")
    }
};

var run = function (argOne, argTwo) {
    choose(argOne, argTwo);
};

run(process.argv[2], process.argv[3]);

