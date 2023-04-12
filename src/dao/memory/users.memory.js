import MemoryManager from "./memory_manager.js";

class User{
	constructor(){
		this.memoryManager = new MemoryManager();		
	};
	getUserByEmail = async(userEmail) => {
		return await this.memoryManager.getOneByParam("email", userEmail);
	};
	getUserById = async(userId) => {
		return await this.memoryManager.getById(userId);
	};
	createUser = async(userData) => {
		return await this.memoryManager.add(userData);
	};

	updateUserByEmail = async(userEmail, userData) => {};
	updateUserById = async(userId, userData) => {};
	
	deleteUserById = async(userId) => {
		return await this.memoryManager.delete(userId);
	};
	
	deleteUserByEmail = async(userEmail) => {
		const user = await this.getUserByEmail(userEmail);
		return await this.deleteUserById(user._id);
	};
}

export default User;