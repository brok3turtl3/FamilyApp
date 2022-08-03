const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/user
// @ desc   get current users profile
// @access  Private

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

// @route   POST api/profile
// @ desc   Create/Update profile data for logged in user
// @access  Private

router.post(
	'/',
	[auth, [check('bio', 'Bio is a required field').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//DESTRUCTURE VARIABLES FROM REQ.BODY FOR EASE OF USE AND CLARITY
		const { city, bio, interests, dob, twitter, facebook, instagram } =
			req.body;

		//BUILD PROFILE OBJECT
		const profileFields = {};
		profileFields.user = req.user.id;
		if (city) profileFields.city = city;
		if (bio) profileFields.bio = bio;
		if (interests) profileFields.interests = interests;
		if (dob) profileFields.dob = dob;
		if (twitter) profileFields.twitter = twitter;
		if (facebook) profileFields.facebook = city;
		if (instagram) profileFields.instagram = instagram;
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

module.exports = router;
