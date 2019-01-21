import request from 'request';
import { githubOathUrl, gitHubCclientSecret, gitHubClientId } from './utils/constants';
import { Express } from 'express';

export = (app: Express) => {
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
};
