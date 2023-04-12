export default class UserDTO{
	constructor(user){
		this.firstName = user.firstName || "";
		this.lastName = user.lastName || "";
		this.fullName = this.firstName + this.lastName;
		this.username = user.username || "";
		this.email = user.email || "";
		this.password = user.password || "";
		this.role = user.role || "user";
		this.social = user.social || "local";
		this.recoveryCode = user.recoveryCode || null;
	}
}