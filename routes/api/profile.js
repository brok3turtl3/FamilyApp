const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//ENDPOINT  GET api/profile/user
//PURPOSE   Get current users profile
//ACCESS    Private

router.get('/user', auth, async (req, res) => {
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
	[auth, [check('bio', 'Bio is a required field').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//DESTRUCTURE VARIABLES FROM REQ.BODY FOR EASE OF USE AND CLARITY
		const {
			city,
			company,
			position,
			school,
			program,
			bio,
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
		if (interests) profileFields.interests = interests;
		if (dob) profileFields.dob = dob;

		if (interests) {
			profileFields.interests = interests
				.split(',')
				.map((interest) => interest.trim());
			console.log(profileFields.interests);
		}

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

				return res.json(profile);
			}

			//IF NO PROFILE EXISTS THEN CREATE NEW PROFILE
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

//ENDPOINT  GET api/profile
//PURPOSE   Get all profiles
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
//PURPOSE   Get profile by user ID
//ACCESS    Private

router.get('/user/:user_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name']);

		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found' });
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

module.exports = router;
