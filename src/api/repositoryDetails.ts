import request from 'request';
import { Express } from 'express';
import { getHeaders } from './utils/helpers';
import { rest } from './utils/constants';

export = (app: Express) => {
	app.get('/repositoryDetails', async (req, res) => {
		const organization = req.query.organization;
		const repository = req.query.repository;
		const token = req.query.token;
		const resultsPromises = [];
		let readme;
		let packageJson;

		resultsPromises.push(new Promise(resolve => {
			request({
				url: `${rest}/repos/${organization}/${repository}/readme`,
				headers: getHeaders(token)
			}, (e, r, b) => {
				const result = JSON.parse(b);
				readme = Buffer.from(result.content, 'base64').toString();
				resolve();
			});
		}));

		resultsPromises.push(new Promise(resolve => {
			request({
				url: `${rest}/repos/${organization}/${repository}/contents/package.json`,
				headers: getHeaders(token)
			}, (e, r, b) => {
				const result = JSON.parse(b);
				packageJson = Buffer.from(result.content, 'base64').toString();
				resolve();
			});
		}));

		await Promise.all(resultsPromises);

		res.send({
			'readme': readme,
			'package.json': packageJson
		});
	});
};
