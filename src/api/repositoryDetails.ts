import bluebird from 'bluebird';
import _request from 'request';
import { Express } from 'express';
import { getHeaders } from './utils/helpers';
import { rest } from './utils/constants';
const request: any = bluebird.promisifyAll(_request);

export = (app: Express) => {
	app.get('/repositoryDetails', async (req, res) => {
		const organization = req.query.organization;
		const repository = req.query.repository;
		const token = req.query.token;

		try {
			const readmeResponse = JSON.parse((await request.getAsync({
				url: `${rest}/repos/${organization}/${repository}/readme`,
				headers: getHeaders(token)
			})).body);
			const packageResponse = JSON.parse((await request.getAsync({
				url: `${rest}/repos/${organization}/${repository}/contents/package.json`,
				headers: getHeaders(token)
			})).body);

			const readme = Buffer.from(readmeResponse.content, 'base64').toString();
			const packageJson = Buffer.from(packageResponse.content, 'base64').toString();

			res.send({
				'readme': readme,
				'package.json': packageJson
			});
		} catch (e) {
			res.send({
				error: 'Cannot get repository details'
			});
		}
	});
};
