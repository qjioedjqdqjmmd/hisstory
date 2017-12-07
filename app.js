var google = require('googleapis');

var blogger = google.blogger('v3');
var util = require('util');

var _KEY = '';
var _BLOGID = '';

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
});