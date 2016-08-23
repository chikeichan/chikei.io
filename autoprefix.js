require('babel-polyfill');
var fs = require('fs');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');
var cleaner  = postcss([
  autoprefixer({
    browsers: []
  })
]);
var prefixer = postcss([
  autoprefixer
]);
var filepath = './public/styles/bundle.css';


fs.readFile(filepath, function(err, file) {
  var css = file.toString();

  if (err) {
    console.log('Error reading file');
    return;
  }

  cleaner
    .process(css)
    .then(function (cleaned) {
      return prefixer.process(cleaned.css)
    }).then(function (result) {
      fs.writeFile(filepath, result.css, function(err) {
        if (err) {
          console.log('Error writing new file');
        } else {
          console.log('Done writing new file');
        }
      })
    });
})