import { Express } from 'express';
import auth from './auth';
import commits from './commits';
import pinnedRepositories from './pinnedRepositories';
import repositoryDetails from './repositoryDetails';
import login from './login';
import register from './register';
import passport from 'passport';
import patch from './patch';


export = (app: Express) => {
	auth(app);
	commits(app, passport.authenticate('jwt', { session: false }));
	pinnedRepositories(app, passport.authenticate('jwt', { session: false }));
	repositoryDetails(app, passport.authenticate('jwt', { session: false }));
	patch(app, passport.authenticate('jwt', { session: false }));
	login(app);
	register(app);
};
