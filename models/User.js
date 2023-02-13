import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePic: {
		type: String
	},
	notifications: [
		{
			name: {
				type: String,
			},
			userId: {
				type: String
			},
			type: {
				type: String,
			},
			postId: {
				type: String,
			},
		},
	],
	lastLogIn: {
type: Date
	},

	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('users', UserSchema);
export default User;
