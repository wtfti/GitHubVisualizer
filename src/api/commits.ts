import bluebird from 'bluebird';
import _request from 'request';
import { getHeaders } from './utils/helpers';
import { rest } from './utils/constants';
import { Express } from 'express';
const request: any = bluebird.promisifyAll(_request);

export = (app: Express) => {
	app.get('/commits', async (req, res) => {
		const organization = req.query.organization;
		const repository = req.query.repository;
		const token = req.query.token;

		const response = JSON.parse((await request.getAsync({
			url: `${rest}/repos/${organization}/${repository}/commits`,
			headers: getHeaders(token)
		})).body);

		res.send({
			commits: response
		});
	});
};
