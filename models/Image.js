import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	imageUrl: {
		type: String,
	},
	date: {
    type: Date,
    default: Date.now
  }


})

const Image = mongoose.model('image', ImageSchema);
export default Image;