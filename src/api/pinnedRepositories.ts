import request from 'request';
import { getHeaders } from './utils/helpers';
import { rest, graphQl } from './utils/constants';
import { Express } from 'express';

export = (app: Express) => {
	app.post('/pinnedRepositories', async (req: any, res: any) => {

		const organization = req.body.organization;
		const token = req.body.token;
		let result: Array<any> = [];

		await new Promise(resolve => request.post({
			url: graphQl,
			headers: getHeaders(token),
			body: JSON.stringify({
				query: pinnedRepositoriesQuery(organization)
			})
		}, (error: any, response: any, body: any) => {
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

		await Promise.all(temp);
		res.send(result);
	});
};

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
