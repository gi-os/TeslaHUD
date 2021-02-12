var $ = require('jQuery');
var SpotifyWebApi = require('spotify-web-api-node');

 /**
  * This example retrieves information about the 'current' user. The current user is the user that has
  * authorized the application to access its data.
  */

 /* Retrieve a code as documented here:
  * https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
  *
  * Codes are given for a set of scopes. For this example, the scopes are user-read-private and user-read-email.
  * Scopes are documented here:
  * https://developer.spotify.com/documentation/general/guides/scopes/


  $.ajax({
      type: "GET",
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: 'AQDS_-KAl3Q_yQ_tBqFpfPNFTQrPH1ba6y4QNrJxAb48FLSReHrllL3WuaZI-7HeFaoPsaYFhpHPD7rzREPQlvadsMwHvZWyIa8IeoGx2IN_sfoE9eW263SZGGY2vKQt3qg'
      },
      success: function(data) {
        console.log(data);
        console.log(data.item.name);
        console.log(data.item.artists[0].name);

       var artwork = data.item.album.images[1].url;
        var trackName = data.item.name;
        var artistName = data.item.artists[0].name;

        var artworkID = document.getElementById('trackArtwork');
        var track = document.getElementById('trackName');
        var artist = document.getElementById('artist');

     artworkID.innerHTML = '<img src=' + artwork + '>';
       track.textContent = trackName;
       artist.textContent = 'By ' + artistName;



      },
      dataType: "json"
    });
http://localhost:8888/#access_token=
  */
  var express = require('express'); // Express web server framework
  var request = require('request'); // "Request" library
  var cors = require('cors');
  var querystring = require('querystring');
  var cookieParser = require('cookie-parser');
  var app = express();
  var client_id = '35748c46209741f1a25ea9b20e86098c'; // Your client id
  var client_secret = '946b5bab9fd048fbb568b32276d60f28'; // Your secret
  var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
  var access_token = 'BQCPygPmnqwArucvkeK68mrQhWGZ-1WMfbh18ndC6WvS2b6F9JV3X6Aj0pKi2dxkhAV7ISZMXxaL6y0_lusR07gigheNrP3GpBpJfWcyec_yaDhXE16fjH1U17ZbuvYYRqW1g9p0F_nV-qRtk7k5s75E5iSpi9amSsZiHA'; // Your redirect uri
  var access_token2;
  var request = require('request');
function dogood(){
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    scope: scope,
    form: {

      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };
  var scope =
  		"user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-collaborative playlist-modify-public";
        request.post(authOptions, function(error, response, body) {
    //var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
      scope: scope,
      form: {
        grant_type: 'refresh_token',
        refresh_token: 'AQCjeBTTFqVq2dGGjPngB3ha9fXFKHRejdUOOb2iNDijwIcKhuAU1kLIJdec4-RObJK92rac9QdHOE0hgDD3UO4qKizqE9nMw32yGUnijrWEFoU1Uut3wEiNGDcCIAfrxZk'
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      console.log('HERE IS body -->  ',body)
      access_token2 = body.access_token;
      refresh_token2 = body;
      access_token = body.access_token;
      spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(access_token2);
      console.log('HERE IS TOKEN -->  ',access_token2)
      console.log('HERE IS REFRESH -->  ',refresh_token2)
      //getplaylist()
    });
    console.log('HERE IS body2 -->  ',body)

  });
}





function getnewtoken(){
  dogood()


  //getnowplay()
}
//getnewtoken()
// set it in the wrapper
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(access_token);
function getplaylist(){
  spotifyApi.getUserPlaylists()
    .then(function(data) {
      console.log('User playlists', data['body']['items']);
    }, function(err) {
      console.error(err);
      getnewtoken()
    });
}
function getnowplay(){
  spotifyApi.getMyCurrentPlayingTrack()
  .then(function(data) {
    console.log('User Now Play',data);
  }, function(err) {
    console.error(err);
    getnewtoken()

  });
}
//getnowplay()
//getplaylist()
getnewtoken()
