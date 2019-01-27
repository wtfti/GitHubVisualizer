import { Express } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { secretKey } from './utils/constants';

export = (app: Express) => {
	app.post('/login', (req, res) => {
		passport.authenticate('local', { session: false }, (err, user) => {
			if (err || !user) {
				return res.status(400).json({
					message: 'Something is not right',
					user: user
				});
			}

			req.login(user, { session: false }, error => {
				if (error) {
					res.send(error);
				}

				// generate a signed son web token with the contents of user object and return it in the response
				const token = jwt.sign(user, secretKey);
				return res.send({
					jwtToken: token
				});
			});
		})(req, res);
	});
};
