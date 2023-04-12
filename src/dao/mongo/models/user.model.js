import mongoose from "mongoose";

const schema = mongoose.Schema({
	firstName: String,
	lastName: String,
	fullName: String,
	username: String,
	email: {
		type: String,
		unique: true
	},
	password: String,
	role: String,
	social: String,
	recoveryCode: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("users", schema);

