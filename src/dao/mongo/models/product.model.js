import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = mongoose.Schema(
	{
		title: String,
  		description: String,
 		code: Number,
  		price: Number,
  		status: Boolean,
  		stock: Number,
  		thumbnails: Array,
		owner: String
	}
);

schema.plugin(mongoosePaginate);

export default mongoose.model("products", schema);
