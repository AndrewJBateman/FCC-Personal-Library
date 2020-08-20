'use strict';
require('dotenv').config({ path: './.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const mongoose = require('mongoose');
const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use(cors({ origin: '*' })); //USED FOR FCC TESTING PURPOSES ONLY!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//challenge 1. I will not have anything cached in my client
app.use(helmet.noCache());
//challenge 2. I will see that the site is powered by 'PHP 4.2.0' even though it isn't
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

mongoose.Promise = global.Promise;

// MongoDB Atlas Database Access Credentials
const dbUserName = process.env.USER_NAME;
const dbUserPass = process.env.USER_PASSWORD;
const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTER;
const dbUrl = `mongodb+srv://${dbUserName}:${dbUserPass}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

// MongoDB Database connection
mongoose.set('useFindAndModify', false);
mongoose.connect(
	dbUrl,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, db) => {
		if (err) {
			console.log('Database connection error: ' + err);
		} else {
			console.log(
				'Successful database connection to Mongoose Atlas database named: ',
				dbName
			);
		}
	}
);

//Index page (static HTML)
app.route('/').get(function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
	res.status(404).type('text').send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
	console.log('Listening on port ' + process.env.PORT);
	if (process.env.NODE_ENV === 'test') {
		console.log('Running Tests...');
		setTimeout(function () {
			try {
				runner.run();
			} catch (e) {
				var error = e;
				console.log('Tests are not valid:');
				console.log(error);
			}
		}, 1500);
	}
});

module.exports = app; //for unit/functional testing
