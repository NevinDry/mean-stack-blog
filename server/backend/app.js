const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload');

var tokenAuthCheck = require('./middleware/check-auth');
var db = require('./db')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/media", express.static('media'));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.get(new RegExp('^(?!\/api).*$'), function(req, res){
  res.sendFile(__dirname + '/angular/index.html');
});

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(tokenAuthCheck);

app.use('/api/blog', blogRoutes);
app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);

db.connect('mongodb://localhost:27017', function(err) {
  if (err) {
    console.log(err);
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    const port = "3001";
    app.listen(port, function() {
      console.log('Mongo Listening on port ' + port);
    })
  }
});

app.use(responseHandler);

function responseHandler(response, req, res, next) {
  console.log("\u001b[1;34m -----------------HTTP RESPONSE-------------------");

  if(!response.success){
    console.log( "\u001b[1;31m  Error \u001b[0m" );
    console.log(response.error);
    console.log(response);

  }else{
    console.log( "\u001b[1;32m Success \u001b[0m" );
     console.log(response);
  }
  console.log("\u001b[1;34m --------------------------------------------------- \u001b[0m");


	return res.status(response.status).json({message: response.message, data: response.data });
}

module.exports = app;
