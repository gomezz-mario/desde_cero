import UserDTO from "../dao/dto/user.dto.js";
import Mailer from "../modules/mailer/mailer.js";

class UserRepository{
	constructor(userDao){
		this.mailer = new Mailer();
		this.userDao = userDao;
	};
	getUserByEmail = async(userEmail) => {
		return await this.userDao.getUserByEmail(userEmail);
	};
	getUserById = async(userId) => {
		return await this.userDao.getUserById(userId); 
	};
	createUser = async(userData) => {
		const dataToInsert = new UserDTO(userData);
		return await this.userDao.createUser(dataToInsert);
	};
	setRecoveryCodeUser = async(userId, recoveryCodeId) => {
		return await this.userDao.setRecoveryCodeUser(userId, recoveryCodeId);
	};
	updateUserByEmail = async(userEmail, userData) => {
		return await this.userDao.updateUserByEmail(userEmail, userData);
	};
	updateUserById = async(userId, userData) => {
		return await this.userDao.updateUserById(userId, userData);
	};
	deleteUserById = async(userId) => {
		return await this.userDao.deleteUserById(userId);
	};
	deleteUserByEmail = async(userEmail) => {
		return await this.userDao.deleteUserByEmail(userEmail);
	};
	sendMail = async(toEmail, recoveryLink) => {
		return await this.mailer.sendEmail(toEmail, recoveryLink);
	}

}

export default UserRepository;