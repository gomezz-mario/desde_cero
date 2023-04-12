import Connect from "./connect.mongo.js";
import UserModel from "./models/user.model.js";

class User{
	constructor(){
		Connect.getInstance();				
	};
	getUserByEmail = async(userEmail) => {
		return await UserModel.findOne({email: userEmail}); 
	};
	getUserById = async(userId) => {
		return await UserModel.findById(userId);
	};
	createUser = async(userData) => {
		return await UserModel.create(userData);
	};
	setRecoveryCodeUser = async(userId, recoveryCodeId) => {
		return await UserModel.findByIdAndUpdate(userId, {recoveryCode: recoveryCodeId});
	};

	updateUserByEmail = async(userEmail, userData) => {};
	updateUserById = async(userId, userData) => {};
	
	deleteUserById = async(userId) => {
		return await UserModel.findByIdAndDelete(userId);
	};
	deleteUserByEmail = async(userEmail, userData) => {
		const user = await this.getUserByEmail(userEmail);
		return await this.getUserById(user._id);
	};
}

export default User;