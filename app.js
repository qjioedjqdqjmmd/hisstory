var google = require('googleapis');
var webshot = require('webshot');

var request = require('request');

var blogger = google.blogger('v3');
var util = require('util');

var _KEY = '';
var _BLOGID = '';

/*
blogger.blogs.get({
  key: _KEY,
  blogId: _BLOGID
}, function (err, result) {
  if (err) {
    console.error(err);
  }
  if (result) {
    console.log(util.inspect(result));
  }
});*/

/*
var shot_options = {
  screenSize: {
    width: 1024
  , height: 768
  }
, shotSize: {
    width: 'all'
  , height: 'all'
  }
};
webshot('https://datalab.naver.com/', './dest/naver-result.png', shot_options, function(err) {
  // screenshot now saved to google.png 
});
*/
var readline = require('readline');
var OAuth2Client = google.auth.OAuth2;
var CLIENT_ID = '';
var CLIENT_SECRET = '';
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken (oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  request(url, function(err, res, body){
    if(err){
      console.error(err);
    }
    console.log(res);
  });
  /*
  rl.question('Enter the code here:', function (code) {
    // request access token
    oauth2Client.getToken(code, function (err, tokens) {
      if (err) {
        return callback(err);
      }
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
  */
}

// retrieve an access token
getAccessToken(oauth2Client, function () {
  // retrieve user profile
  plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
    if (err) {
      return console.log('An error occured', err);
    }
    console.log(profile.displayName, ':', profile.tagline);
  });
});
/*
var post_option = {
  blogId : _BLOGID
}
blogger.posts.insert({
  blogId : _BLOGID,
  key: _KEY,
  title : 'test',
  content : 'With <b>exciting</b> content...'
}, function(err, result){
  if(err){
    console.error(err);
  }
  if(result){
    console.log('done')
  }
});*/