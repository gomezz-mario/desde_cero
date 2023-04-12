import CustomRouter from "./custom.routes.js";
import { login, logout, register, sendRecoveryEmail, recoveryMyAcount} from "../controllers/users.controller.js";
import passport from "passport";

class UsersRouter extends CustomRouter{
	init(){
		this.get('/', ["PUBLIC"], passport.authenticate("login-local"), login);
		this.get('/logout', ["PUBLIC"], logout);
		this.post('/', ["PUBLIC"], passport.authenticate("register-local"), register);
		this.get('/send_recovey_email', ["PUBLIC"], sendRecoveryEmail);		
		this.get("/recovery_my_account",["PUBLIC"], recoveryMyAcount);
	}
}

export default UsersRouter;