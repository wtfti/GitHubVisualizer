import request from 'request';
import { getHeaders } from './utils/helpers';
import { rest } from './utils/constants';
import { Express } from 'express';

export = (app: Express) => {
	app.get('/commits', async (req, res) => {
		const organization = req.query.organization;
		const repository = req.query.repository;
		const token = req.query.token;

		request({
			url: `${rest}/repos/${organization}/${repository}/commits`,
			headers: getHeaders(token)
		}, (e, r, b) => {
			const commits = JSON.parse(b);
			res.send({
				commits: commits
			});
		});
	});
};
