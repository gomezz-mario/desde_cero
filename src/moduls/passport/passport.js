import passport from "passport";
import { userService } from "../../repository/index.js";
import inicializeLocalStrategies from "./strategies/local.strategy.js";

const initializePassport = () => {

	inicializeLocalStrategies();

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser( async(id, done) => {
		const user = await userService.getUserById(id);
		done(null, user);
	});
}

export default initializePassport;