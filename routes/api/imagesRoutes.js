import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth.js';
import Image from '../../models/Image.js';

import { check, validationResult } from 'express-validator';

//ENDPOINT  POST api/images
//PURPOSE   Add a new image
//ACCESS    Private
router.post(
	'/',
	[auth, [check('images', 'An image is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { images } = req.body;
		console.log(images);
		const imageFields = {};
		try {
			for (let i = 0; i < images.length; i++) {
				imageFields.user = req.user.id;
				imageFields.imageUrl = images[i];

				const newImage = new Image(imageFields);
				await newImage.save();
				// return res.json(newImage);
				console.log(`Image ${i} uploaded! ${images[i]}`);
			}
			let imageResponse = await Image.find().sort({ date: -1})
			res.json(imageResponse);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

//ENDPOINT  GET api/images
//PURPOSE   Get all images for current user
//ACCESS    Private
router.get('/', auth, async (req, res) => {
	try {
		const images = await Image.find().sort({ date: -1});

		res.json(images);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

export default router;
