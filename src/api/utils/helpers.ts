import { gitHubAppName } from './constants';

export function getHeaders(token: String) {
	if (token.indexOf('bearer') > -1) {
		return {
			'Content-Type': 'application/json',
			'Authorization': token,
			'User-Agent': gitHubAppName
		};
	}

	return {
		'Content-Type': 'application/json',
		'Authorization': `bearer ${token}`,
		'User-Agent': gitHubAppName
	};
}
