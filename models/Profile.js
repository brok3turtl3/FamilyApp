import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	city: {
		type: String,
	},
	bio: {
		type: String,
	},
	smallBio: {
		type: String
	},
	image: {
		type: String
	},
	work: {
		company: {
			type: String,
		},
		position: {
			type: String,
		},
	},
	education: {
		school: {
			type: String,
		},
		program: {
			type: String,
		},
	},
	interests: {
		type: [String],
	},
	dob: {
		type: Date,
	},
	social: {
		facebook: {
			type: String,
		},
		instagram: {
			type: String,
		},
		twitter: {
			type: String,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Profile = mongoose.model('profile', ProfileSchema);
export default Profile;
