import mongoose from "mongoose";

const schema = mongoose.Schema({
	code: String,
},{
	timestamps: {createdAt: 'created_at', updatedAt: null }
});

schema.index({created_at: 1},{expireAfterSeconds: 3600});//para que sea una hora 3600

export default mongoose.model("recoverycodes", schema);