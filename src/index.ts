// equivalent of older: const express = require('express')
import express from 'express';
import path from 'path';
import routes from './api';
const app = express();

// Allow any method from any host and log requests
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
	if ('OPTIONS' === req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'ui')));
app.use('/content', express.static(path.join(__dirname, 'ui')));
app.use('/details', express.static(path.join(__dirname, 'ui')));


// register routes
routes(app);

// start our server on port 4201
app.listen(4201, 'localhost', function () {
	global.console.log('Server now listening on 4201');
});
