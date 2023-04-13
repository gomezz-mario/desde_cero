import RecoverycodeModel from "./models/recoverycode.model.js";
import Connect from "./connect.mongo.js";
import { createHash } from "../../utils/bcrypt.js";

class RecoveryCode{
	constructor(){
		Connect.getInstance();
	}
	create = async(code) => {
		return await RecoverycodeModel.create({code: createHash(code)});
	}

	getById = async(id) => {
		return await RecoverycodeModel.findById(id);
	}
}

export default RecoveryCode;