import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import SimpleFileUpload from 'react-simple-file-upload';
import './PostForm.css';
import axios from 'axios';

import { MentionsInput, Mention } from 'react-mentions';
import { addImages } from '../../actions/images';

const PostForm = ({ addPost, addImages }) => {
	const [users, setUsers] = useState([]);
	const [tagged, setTagged] = useState([]);
	

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			const res = await axios.get('/api/users');
			const usersArr = [];
			res.data.map((item) =>
				usersArr.push({
					id: item._id,
					display: item.name,
				})
			);
			setUsers(usersArr);
		} catch (error) {
			console.log(error.message);
		}
	};

	const [formData, setFormData] = useState({
		text: '',
		images: [],
	});

	const { text, images } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, text: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newText = text;

		newText = newText.split('@@@__').join(' ');

		let body = newText.trim();

		const newObj = {
			text: body,
			images,
			tagged,
		};

		addPost(newObj);
		addImages(images);

		setFormData({ text: '', images: [] });
		setTagged([]);
	};

	const onAdd = (id, display) => {
		setTagged([...tagged, id]);
	};

	function handleFile(url) {
		if (formData.images.length < 5) {
			setFormData({ ...formData, images: [...formData.images, url] });
		}
	}

	return (
		<Fragment>
			<form className='submit-post' onSubmit={handleSubmit}>
				<div className='post-field'>
					<MentionsInput
						className='mentions-styling'
						id='placeholder'
						value={text}
						name='text'
						onChange={handleChange}
						placeholder={'What is on your mind? (Use "@" to mention people!)'}
					>
						<Mention
							trigger='@'
							data={users}
							markup='@@@__@__display__'
							className='mention-styling'
							appendSpaceOnAdd={true}
							onAdd={onAdd}
						/>
					</MentionsInput>
				</div>
				<div className='post-pic-section'>
					<div>
						{images.length > 0
							? images.map((image, index) => {
									return (
										<Fragment>
											<div className='post-pic-current'>
												<img
													src={image}
													alt='PH'
													className='post-pic-img'
												></img>
												<div>Current pic</div>
											</div>
										</Fragment>
									);
							  })
							: null}
						{images.length >= 4 ? (
							<p className='alert-danger'>Image limit reached</p>
						) : null}
					</div>

					<div>
						<SimpleFileUpload
							apiKey='5af8bfef1fbeedd25af3de7ae9e6b36a'
							onSuccess={handleFile}
							preview={false}
						/>
						<p>Upload a pic</p>
						<p>Click to browse or drag and drop</p>
						<p>Max of 4 pics</p>
					</div>
				</div>

				<div className='post-buttons'>
					<button className='btn' type='submit'>
						Submit Post
					</button>
				</div>
			</form>
		</Fragment>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	addImages: PropTypes.func.isRequired
};

export default connect(null, { addPost, addImages })(PostForm);
