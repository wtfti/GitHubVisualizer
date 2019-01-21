import { Express } from 'express';
import auth from './auth';
import commits from './commits';
import pinnedRepositories from './pinnedRepositories';
import repositoryDetails from './repositoryDetails';


export = (app: Express) => {
	auth(app);
	commits(app);
	pinnedRepositories(app);
	repositoryDetails(app);
};
