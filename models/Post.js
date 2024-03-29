import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	text: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: false,
	},
	name: {
		type: String,
	},
	posterImage: {
		type: String,
	},
	image: {
		type: String,
	},
	images: [
{
	type: String
}
	],
	video: {
		type: String
	},
	videoLink: {
		type: String
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
			name: {
				type: String,
			},
		},
	],
	laughs: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
			name: {
				type: String,
			},
		},
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
			text: {
				type: String,
				required: true,
			},
			name: {
				type: String,
			},
			commentorPic: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	watchlist: [
		{
			userId: {
				type: String,
			},
		},
	],

	date: {
		type: Date,
		default: Date.now,
	},
});

const Post = mongoose.model('post', PostSchema);
export default Post;
