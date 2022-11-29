import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BugSchema = new Schema({
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
	posterImage: {
		type: String
	},
	image: {
		type: String,
	},
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
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	
	date: {
		type: Date,
		default: Date.now,
	},
});

const Bug = mongoose.model('bug', BugSchema);
export default Bug;