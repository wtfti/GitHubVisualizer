// equivalent of older: const express = require('express')
import express from 'express';
import path from 'path';
import request from 'request';
const gitHubClientId = '3923faf39e1967fabd43';
const gitHubCclientSecret = '32b412226f77bce238569f5169d60edf08d75535';
const githubOathUrl = 'https://github.com/login/oauth/access_token';
const graphQl = 'https://api.github.com/graphql';
const rest = 'https://api.github.com';
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

app.get('/auth', (req, res) => {
	request.post({
		url: `${githubOathUrl}?client_id=${gitHubClientId}&client_secret=${gitHubCclientSecret}&code=${req.query.code}`,
		headers: {
			'Content-Type': 'application/json'
		}
	}, (error, response, body) => {
		res.redirect(`/?${body}`);
	});
});

app.post('/repositoryInfo', async (req, res) => {
	const organization = req.body.organization;
	const token = req.body.token;
	let result: Array<any> = [];


	await new Promise(resolve => request.post({
		url: graphQl,
		headers: getHeaders(token),
		body: JSON.stringify({
			query: pinnedRepositoriesQuery(organization)
		})
	}, (error, response, body) => {
		result = JSON.parse(body).data.repositoryOwner.pinnedRepositories.edges.map((item: any) => {
			return {
				name: item.node.name,
				license: item.node.licenseInfo.name,
				collaborators: item.node.mentionableUsers.totalCount,
				releases: item.node.releases.totalCount,
				commits: item.node.defaultBranchRef.target.history.totalCount
			};
		});
		resolve();
	}));

	const temp: Array<any> = [];

	result.forEach((item: any, index: number) => {
		temp.push(new Promise(resolve => {
			request.get({
				uri: `${rest}/repos/${organization}/${item.name}/branches`,
				headers: getHeaders(token)
			}, (_error, _response, _body) => {
				result[index].branches = JSON.parse(_body);
				resolve();
			});
		}));
	});

	Promise.all(temp)
	.then(r => {
		res.send(result);
	});
});

// start our server on port 4201
app.listen(4201, 'localhost', function () {
	global.console.log('Server now listening on 4201');
});

function pinnedRepositoriesQuery(organization: String) {
	const repositoryAmount = 20;
	const mentionableUsers = 10;

	return `{
		repositoryOwner(login: "${organization}") {
		  ... on Organization {
			pinnedRepositories(first: 10) {
			  edges {
				node {
				  name
				  licenseInfo {
					name
				  }
				  mentionableUsers {
					totalCount
				  }
				  releases {
					totalCount
				  },
				  defaultBranchRef {
					target {
					  ... on Commit {
						history(first: 0) {
						  totalCount
						}
					  }
					}
				  }
				}
			  }
			}
		  }
		}
	  }`;
}

function getHeaders(token: String) {
	const gitHubAppName = 'Visualize';

	return {
		'Content-Type': 'application/json',
		'Authorization': `bearer ${token}`,
		'User-Agent': gitHubAppName
	};
}
