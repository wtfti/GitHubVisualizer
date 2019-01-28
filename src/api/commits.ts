import bluebird from 'bluebird';
import _request from 'request';
import { getHeaders } from './utils/helpers';
import { rest } from './utils/constants';
import { Express } from 'express';
import { Cache } from './utils/cache';
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

		const cachedResponse = checkCache(organization, repository, fromDate, toDate, page);
		if (cachedResponse) {
			return res.send(cachedResponse);
		}

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

		const result = {
			commits: JSON.parse(response.body),
			pagination: {
				totalPages: totalPages,
				currentPage: page
			}
		};

		addCache(organization, repository, fromDate, toDate, page, result);

		res.send(result);
	});
};

function checkCache(organization: String, repository: String, fromDate: Array<String>, toDate: Array<String>, page: String) {
	const key = `${organization}.${repository}.${fromDate.join('.')}.${toDate.join('.')}.${page}`;

	return Cache.get(key);
}

function addCache(organization: String, repository: String, fromDate: Array<String>, toDate: Array<String>, page: String, response: any) {
	const key = `${organization}.${repository}.${fromDate.join('.')}.${toDate.join('.')}.${page}`;

	Cache.push(key, response);
}
