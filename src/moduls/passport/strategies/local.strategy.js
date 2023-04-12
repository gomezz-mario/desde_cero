import passport from 'passport';
import passportLocal from 'passport-local';
import { userService } from '../../../repository/index.js';
import { createHash, isValidPassword } from "../../../utils.js";

const LocalStrategy = passportLocal.Strategy;

const inicializeLocalStrategies = () => {
	passport.use('login-local', new LocalStrategy(
		
		{ usernameField: 'email' },
		async(username, password, done) => {
			try {
				const user = await userService.getUserByEmail(username);
				if(!user) return done(null, false);
				console.log("el usuario existe")
				if(!isValidPassword(user, password)) return done(null, false);
				console.log("el pass es valido")
				return done(null, user);
			} catch (error) {
				return done({error: `Error login-local strategy. ${error}`});
			}
		}
	));

	passport.use('register-local', new LocalStrategy(
		{passReqToCallback: true, usernameField: 'email'},
		async(req, username, password, done) => {
			try {
				const userDB = await userService.getUserByEmail(username);
				if(userDB) return done(null, false);
				const userData = req.body;
				userData.password = createHash(password);
				const user = await userService.createUser(userData);
				return done(null, user);
			} catch (error) {
				return done({error: `Error en register-local strategy. ${error}`});
			}
		}	
	))
}

export default inicializeLocalStrategies;