import { Express } from 'express';
import { UsersStore } from './utils/usersStore';
import jwt from 'jsonwebtoken';
import { secretKey } from './utils/constants';

export = (app: Express) => {
	app.post('/register', (req, res) => {
		const { username, password, confirmPassword } = req.body;

		if (UsersStore.get(username)) {
			return res.status(400).json({
				message: 'This username exists. Please choose another.'
			});
		}

		if (password !== confirmPassword) {
			return res.status(400).json({
				message: 'Password and confirm password fields missmatch'
			});
		}

		UsersStore.register({
			username: username,
			password: password
		});

		res.send({
			success: true
		});
	});
};
