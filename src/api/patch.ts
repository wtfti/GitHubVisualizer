import { Express } from 'express';
import _request from 'request';
import bluebird from 'bluebird';
const request: any = bluebird.promisifyAll(_request);

export = (app: Express, protectedRoute: any) => {
	app.get('/patch', protectedRoute, async (req, res) => {
		const { organization, repository, sha } = req.query;

		const response = await request.getAsync(`https://github.com/${organization}/${repository}/archive/${sha}.zip`);

		res.send(response);
	});
};
