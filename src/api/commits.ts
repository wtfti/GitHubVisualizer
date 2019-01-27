import bluebird from 'bluebird';
import _request from 'request';
import { getHeaders } from './utils/helpers';
import { rest } from './utils/constants';
import { Express } from 'express';
const request: any = bluebird.promisifyAll(_request);

export = (app: Express, protectedRoute: any) => {
	app.get('/commits', protectedRoute, async (req, res) => {
		const organization = req.query.organization;
		const repository = req.query.repository;
		const page = req.query.page || 1;
		const fromDate = req.query.fromDate.split('/');
		const toDate = req.query.toDate.split('/');
		const parsedFromDate = `${fromDate[2]}-${fromDate[0]}-${fromDate[1]}`;
		const parsedToDate = `${toDate[2]}-${toDate[0]}-${toDate[1]}`;
		const token = req.query.token;

		const response = await request.getAsync({
			url: `${rest}/repos/${organization}/${repository}/commits?since=${parsedFromDate}&until=${parsedToDate}&page=${page}`,
			headers: getHeaders(token)
		});
		const responseHeaders = response.headers.link || '';
		let totalPages = 1;

		if (responseHeaders) {
			const lastPage = responseHeaders.match(/page=([0-9]+)>; rel="last"/);
			if (lastPage && lastPage[1]) {
				totalPages = lastPage[1];
			}
		}

		res.send({
			commits: JSON.parse(response.body),
			pagination: {
				totalPages: totalPages,
				currentPage: page
			}
		});
	});
};
