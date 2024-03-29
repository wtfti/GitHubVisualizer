import bluebird from 'bluebird';
import _request from 'request';
import { getHeaders } from './utils/helpers';
import { rest, graphQl } from './utils/constants';
import { Express } from 'express';
const request: any = bluebird.promisifyAll(_request);

export = (app: Express, protectedRoute: any) => {
	app.post('/pinnedRepositories', protectedRoute, async (req: any, res: any) => {
		const organization = req.body.organization;
		const token = req.body.token;

		try {
			const repositories = JSON.parse((await request.postAsync({
				url: graphQl,
				headers: getHeaders(token),
				body: JSON.stringify({
					query: pinnedRepositoriesQuery(organization)
				})
			})).body).data.repositoryOwner.pinnedRepositories.edges.map((item: any) => {
				return {
					name: item.node.name,
					license: item.node.licenseInfo.name,
					releases: item.node.releases.totalCount,
					commits: item.node.defaultBranchRef.target.history.totalCount
				};
			});

			const result = await Promise.all(repositories.map(async (item: any) => {
				const branches = JSON.parse((await request.getAsync({
					uri: `${rest}/repos/${organization}/${item.name}/branches`,
					headers: getHeaders(token)
				})).body);

				const contributorsResponse = await request.getAsync({
					uri: `${rest}/repos/${organization}/${item.name}/contributors?per_page=1`,
					headers: getHeaders(token)
				});

				item.contributors = contributorsResponse.headers.link.match(/page=([0-9]+)>; rel="last"/)[1];
				item.branches = branches;

				return item;
			}));

			res.send(result);
		} catch (e) {
			return res.send({
				error: 'Cannot get pinned repositories'
			});
		}
	});
};

function pinnedRepositoriesQuery(organization: String) {
	const repositoryAmount = 30;

	return `{
		repositoryOwner(login: "${organization}") {
		  ... on Organization {
			pinnedRepositories(first: ${repositoryAmount}) {
			  edges {
				node {
				  name,
				  licenseInfo {
					name
				  },
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
