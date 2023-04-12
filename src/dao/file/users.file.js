import FileManager from "./file_maganger.js";

class User{
	constructor(){
		this.fileManager = new FileManager("./db/users.json");		
	};
	getUserByEmail = async(userEmail) => {
		return await this.fileManager.getOneByParam("email", userEmail);
	};
	getUserById = async(userId) => {
		return await this.fileManager.getById(userId);
	};
	createUser = async(userData) => {
		return await this.fileManager.add(userData);
	};

	updateUserByEmail = async(userEmail, userData) => {};
	updateUserById = async(userId, userData) => {};
	
	deleteUserById = async(userId) => {
		return await this.fileManager.delete(userId);
	};
	deleteUserByEmail = async(userEmail) => {
		const user = await this.getUserByEmail(userEmail);
		return await this.deleteUserById(user._id);
	};
}

export default User;