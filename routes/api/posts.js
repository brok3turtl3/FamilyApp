const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

//ENDPOINT  POST api/posts
//PURPOSE   Add a new post
//ACCESS    Private
router.post(
	'/',
	[
		auth,
		[
			check('subject', 'Subect is required').not().isEmpty(),
			check('text', 'Post message is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const postFields = {
				subject: req.body.subject,
				text: req.body.text,
				name: user.name,
				user: req.user.id,
			};
			const newPost = new Post(postFields);
			await newPost.save();
			res.json(newPost);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

//ENDPOINT  GET api/posts
//PURPOSE   Retrieve all posts
//ACCESS    Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (error) {
		console.error(error.message);
		res.status(500).semd('Server Errror');
	}
});

//ENDPOINT  GET api/posts/:postId
//PURPOSE   Retrieve a post by ID
//ACCESS    Private
router.get('/:postId', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.json(post);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

//ENDPOINT  DELETE api/posts/:postId
//PURPOSE   Delete a post by ID
//ACCESS    Private
router.delete('/:postId', auth, async (req, res) => {
	try {
		//CHECK TO SEE IF POST EXISTS
		const post = await Post.findById(req.params.postId);
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		//CHECK TO SEE IF CURRENT USER MATCHES USERID FOR POST
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		//REMOVE POST
		await post.remove();
		res.json({ msg: 'Post removed' });
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

//ENDPOINT  PUT api/posts/like/:postId
//PURPOSE   Add a like to a post
//ACCESS    Private
router.put('/like/:postId', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		//CHECK TO SEE IF POST IS ALREADY LIKED
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ msg: 'Post already liked' });
		}
		post.likes.unshift({ user: req.user.id });
		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//ENDPOINT  PUT api/posts/unlike/:postId
//PURPOSE   Remove a like to a post
//ACCESS    Private
router.put('/unlike/:postId', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(404).json({ msg: 'Post not liked' });
		}

		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);
		post.likes.splice(removeIndex, 1);
		await post.save();

		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//ENDPOINT  POST api/posts/comment/:postId
//PURPOSE   Comment on a post
//ACCESS    Private
router.post(
	'/comment/:postId',
	[auth, [check('text', 'Post message is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const post = await Post.findById(req.params.postId);

			const newComment = {
				text: req.body.text,
				name: user.name,
				user: req.user.id,
			};

			post.comments.unshift(newComment);

			await post.save();
			res.json(post.comments);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

//ENDPOINT  DELETE api/posts/comment/:postId/:commentId
//PURPOSE   Delete a comment from a post
//ACCESS    Private
router.delete('/comment/:postId/:commentId', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		const comment = post.comments.find(
			(comment) => comment.id === req.params.commentId
		);

		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		if (req.user.id !== comment.user.toString()) {
			return res
				.status(401)
				.json({ msg: 'Not authorized to delete this comment' });
		}

		const indexToRemove = post.comments.indexOf(comment);
		post.comments.splice(indexToRemove, 1);
		post.save();
		res.json(post.comments);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Errror');
	}
});

//ENDPOINT 	PUT api/posts/edit/:postId
//PURPOSE		Edit an existing post
//ACCESS		Private

router.put('/edit/:postId', auth, async (req, res) => {
	try {
		
		//CHECK TO SEE IF POST EXISTS
		const post = await Post.findById(req.params.postId);
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		//CHECK TO SEE IF CURRENT USER MATCHES USERID FOR POST
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		post.text = req.body.text;
		await post.save();
		res.json(post);


	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
