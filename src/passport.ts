import passport from 'passport';
import pass_local from 'passport-local';
import passportJWT from 'passport-jwt';
import { secretKey } from './api/utils/constants';
import { UsersStore } from './api/utils/usersStore';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = pass_local.Strategy;

export = () => {
	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
		function (username, password, cb) {
			return checkCredentials({ username: username, password: password})
				.then(user => {
					if (!user) {
						return cb(undefined, false, { message: 'Incorrect username or password.' });
					}

					return cb(undefined, user, { message: 'Logged In Successfully' });
				})
				.catch(err => cb(err));
		}
	));

	passport.use(new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: secretKey
	},
		function (jwtPayload, cb) {
			return findUser(jwtPayload)
				.then((user: any) => cb(undefined, user))
				.catch((err: any) => cb(err));
		}
	));
};

function checkCredentials(u: User) {
	return new Promise(resolve => {
		const storedUser = UsersStore.get(u.username);

		if (u.password === storedUser.password) {
			return resolve(storedUser);
		}

		resolve(undefined);
	});
}

function findUser(username: String) {
	return new Promise((resolve, reject) => {
		const user = UsersStore.get(username);

		if (!user) {
			return reject(undefined);
		}

		return resolve(user);
	});
}
