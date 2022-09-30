import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth.js';
import Profile from '../../models/Profile.js';
import User from '../../models/User.js';
import { check, validationResult } from 'express-validator';

//ENDPOINT  GET api/profile/user
//PURPOSE   Retrieve current users profile
//ACCESS    Private

router.get('/user', auth, async (req, res) => {
	console.log(req.body);
	console.log('TESTING!!!!');
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name']
		);
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//ENDPOINT  POST api/profile
//PURPOSE   Create/Update profile data for logged in user
//ACCESS    Private

router.post(
	'/',
	auth,

	async (req, res) => {
		//DESTRUCTURE VARIABLES FROM REQ.BODY FOR EASE OF USE AND CLARITY
		const {
			city,
			company,
			image,
			position,
			school,
			program,
			bio,
			smallBio,
			interests,
			dob,
			twitter,
			facebook,
			instagram,
		} = req.body;

		//BUILD PROFILE OBJECT
		const profileFields = {};
		profileFields.user = req.user.id;
		if (city) profileFields.city = city;
		if (bio) profileFields.bio = bio;
		if (smallBio) profileFields.smallBio = smallBio;
		if (interests) profileFields.interests = interests;
		if (dob) profileFields.dob = dob;
		if (image) profileFields.image = image;

		//TODO*** FIGURE OUT WHY THIS CAUSES AN ERROR WHEN PROFILE IS UPDATED
		// if (interests) {
		// 	profileFields.interests = interests
		// 		.split(',')
		// 		.map((interest) => interest.trim());
		// 	console.log(profileFields.interests);
		// }

		//BUILD SOCIALS OBJECT
		profileFields.social = {};

		if (facebook) profileFields.social.facebook = facebook;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;

		//BUILD WORK OBJECT
		profileFields.work = {};
		if (company) profileFields.work.company = company;
		if (position) profileFields.work.position = position;

		//BUILD EDUCATION OBJECT
		profileFields.education = {};
		if (school) profileFields.education.school = school;
		if (program) profileFields.education.program = program;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			//IF PROFILE EXISTS FOR USER - UPDATE INFORMATION
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				//ADD IMAGE TO USER INFO
			console.log('profileRoute HIT!')
			User.findOneAndUpdate({_id: req.user.id}, {profilePic: image}, (err, data) => {
				if(err){
					console.log(err)
				}else{
					console.log(data)
				}
			})

				return res.json(profile);
			}

			//IF NO PROFILE EXISTS THEN CREATE NEW PROFILE
			profile = new Profile(profileFields);
			await profile.save();
			User.findOneAndUpdate({_id: req.user.id}, {profilePic: image}, (err, data) => {
				if(err){
					console.log(err)
				}else{
					console.log(data)
				}
			})
			

			res.json(profile);

						
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

//ENDPOINT  GET api/profile
//PURPOSE   Retrieve all profiles
//ACCESS    Private

router.get('/', auth, async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name']);
		res.json(profiles);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//ENDPOINT  GET api/profile/user/:user_id
//PURPOSE   Retireve profile by user ID
//ACCESS    Private

router.get('/user/:user_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name']);

		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found - TEST' });
		}

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		if (error.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server Error');
	}
});

//ENDPOINT   DELETE api/profile
//PURPOSE    Delete profile, user & posts
//ACCESS     Private
router.delete('/', auth, async (req, res) => {
	try {
		//REMOVE PROFILE
		await Profile.findOneAndRemove({ user: req.user.id });
		//REMOVE USER
		await User.findOneAndRemove({ _id: req.user.id });
		//SEND CONFIRMATION
		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.log(err.msg);
		res.status(500).send('Server Error');
	}
});

export default router;
