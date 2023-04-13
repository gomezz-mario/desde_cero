import { userService, recoveryCodeService } from "../repository/index.js";
import { generate } from "generate-password";
import { isValidCode } from "../utils/bcrypt.js";

export const login = (req, res) => {
	if(!req.user) return res.status(400).send("Login error");
	req.session.user = req.user;
	req.logger.debug("Usuario logueado.");
	res.sendSuccess("Usuario logueado.");
};

export const register = (req, res) => {
	if(!req.user) return res.status(400).send("Register error");
	req.session.user = req.user;
	req.logger.debug("Usuario logueado y logueado.");
	res.sendSuccess("Usuario registrado y logueado");
};
export const update = (req, res) => {};

export const logout = (req, res) => {
	if(req.session.user){
		req.session.destroy(error => {
			if(error) console.log("Error al cerrar sesión. ", error);
		});
	}
	req.logger.debug("Sesión cerrada.");
	res.sendSuccess("Sesión cerrada.");
};

export const sendRecoveryEmail = async(req, res) => {
	const email = req.query.email;
	const user = await userService.getUserByEmail(email);
	if(!user) return res.sendBadRequestError("Email incorrecto");
	const stringcode = generate({length: 10, lowercase: true, uppercase: true, numbers: true, symbols: false});
	const recoverycode = await recoveryCodeService.create(stringcode);
	req.logger.debug("Código de recuperación creado exitosamente.");
	await userService.setRecoveryCodeUser(user._id, recoverycode._id);
	const recoveryLink = `http://localhost:8080/api/users/recovery_my_account?email=${email}&code=${stringcode}`;
	await userService.sendMail(user.email, recoveryLink);
	req.logger.debug("Mail de recuperación enviado.");
	return res.sendSuccess("Mail de recuperación enviado.");
}

export const recoveryMyAcount = async(req, res) => {
	const { email, code } = req.query;
	const user = await userService.getUserByEmail(email);
	if(!user) return res.sendBadRequestError("Usuario no encontrado.");
	if(!user.recoveryCode) return res.sendBadRequestError("Genere un código de recuperación de cuenta");
	const recoveryCode = await recoveryCodeService.getById(user.recoveryCode);
	if(!recoveryCode) return res.sendBadRequestError("El código de recuperación ha expirado. Genere uno nuevo.");
	const codeHash = recoveryCode.code;
	if(!isValidCode(codeHash, code)) return res.sendBadRequestError("Código de recuperación inválido");
	req.logger.debug("Código de recuperación validado.");
	req.session.user = user;
	req.logger.debug("Cuenta recuperada. Cambie la contraseña.");
	res.sendSuccess("Cuenta recuperada. Cambie la contraseña.");
};

export const remove = (req, res) => {};