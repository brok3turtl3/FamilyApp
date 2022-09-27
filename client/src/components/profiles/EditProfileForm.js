import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Hourglass from '../../components/layout/Hourglass';
import SimpleFileUpload from 'react-simple-file-upload';

const initialState = {
	city: '',
	bio: '',
	image: '',
	company: '',
	position: '',
	school: '',
	program: '',
	interests: '',
	dob: '',
	facebook: '',
	instagram: '',
	twitter: '',
};

const EditProfileForm = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
}) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState(initialState);
	// const [uploading, setUploading] = useState(false);

	useEffect(() => {
		if (!profile) getCurrentProfile();
		if (!loading) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			for (const key in profile.work) {
				if (key in profileData) profileData[key] = profile.work[key];
			}
			for (const key in profile.education) {
				if (key in profileData) profileData[key] = profile.education[key];
			}
			for (const key in profile.social) {
				if (key in profileData) profileData[key] = profile.social[key];
			}
			setFormData(profileData);
		}
	}, [loading, getCurrentProfile, profile]);

	const {
		city,
		bio,
		image,
		company,
		position,
		school,
		program,
		interests,
		dob,
		facebook,
		instagram,
		twitter,
	} = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// const uploadFileHandler = async (e) => {
	// 	console.log('uploadFileHandler Hit!');
	// 	const file = e.target.files[0];

	// 	const imgData = new FormData();
	// 	imgData.append('image', file);

	// 	setUploading(true);

	// 	try {
	// 		const config = {
	// 			headers: {
	// 				'Content-Type': 'multipart/form-data',
	// 			},
	// 		};

	// 		const { data } = await axios.post('/api/upload', imgData, config);
	// 		console.log('Here is the path for pic');
	// 		console.log(data);
	// 		setFormData({ ...formData, [e.target.name]: data });
	// 		console.log(formData);
	// 		setUploading(false);
	// 	} catch (error) {
	// 		console.error(error);
	// 		setUploading(false);
	// 	}
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		const success = createProfile(formData, true);

		if (success) {
			navigate('/homepage');
		}
	};

	function handleFile(url) {
		console.log('The URL of the file is ' + url);
		setFormData({...formData, image: url});
	}

	return (
		<Fragment>
			<div className='homepage'>
				<div className='profile-overlay'>
					<div className='profile-container'>
						<div className='heading'>Edit Profile</div>
						<p className='medium-text'>
							Please enter any information you would like to add or update.
							Everything is optional.
						</p>

						<form className='edit-profile' onSubmit={handleSubmit}>
							<div className='fieldset-container'>
								{/* GENERAL INFO FIELDSET */}
								<fieldset>
									<legend>General Information</legend>

									<input
										name='city'
										type='text'
										placeholder='City'
										value={city}
										onChange={handleChange}
									/>

									<div className='register-field'>
										Interests:{' '}
										<span className='normal'>
											(Please use a comma seperated list. eg: "soccer,
											charities, working out" )
										</span>
										<input
											name='interests'
											type='text'
											placeholder='Interests'
											value={interests}
											onChange={handleChange}
										/>
									</div>

									<div className='register-field'>
										<label htmlFor='profile-dob'>
											Date of Birth:{' '}
											{dob !== null ? (
												<Fragment>{dob.substring(0, 10)}</Fragment>
											) : (
												<Fragment>TEST2</Fragment>
											)}
										</label>

										<input
											name='dob'
											type='date'
											placeholder='Date of Birth'
											onChange={handleChange}
											//TODO*** FIGURE OUT HOW TO DISPLAY EXISTING DOB IN EDIT FORM
											//value={dob}
										/>
									</div>

									<SimpleFileUpload
										apiKey='5af8bfef1fbeedd25af3de7ae9e6b36a'
										onSuccess={handleFile}
									/>
									<p>Upload a pic</p>
									<p>Click to browse or drag and drop</p>

									
								</fieldset>
								{/* WORK AND EDUCATION FIELDSET */}
								<fieldset>
									<legend>Work and Education</legend>

									<div className='register-field'>
										<input
											name='company'
											type='text'
											placeholder='Company'
											value={company}
											onChange={handleChange}
										/>
									</div>

									<div className='register-field'>
										<input
											name='position'
											type='text'
											placeholder='Position'
											value={position}
											onChange={handleChange}
										/>
									</div>

									<div className='register-field'>
										<input
											name='school'
											type='text'
											placeholder='School'
											value={school}
											onChange={handleChange}
										/>
									</div>

									<div className='register-field'>
										<input
											name='program'
											type='text'
											placeholder='Program'
											value={program}
											onChange={handleChange}
										/>
									</div>
								</fieldset>

								{/* BIO FIELDSET  */}
								<fieldset>
									<legend>Bio Info</legend>

									<div className='register-field'>
										<textarea
											name='bio'
											type='text'
											placeholder='Introduce yourself!'
											value={bio}
											onChange={handleChange}
											rows='8'
										></textarea>
									</div>
								</fieldset>
								{/* SOCIALS FIELDSET */}
								<fieldset>
									<legend>Socials Information</legend>

									<div className='register-field'>
										<input
											name='facebook'
											type='text'
											placeholder='facebook'
											value={facebook}
											onChange={handleChange}
										/>
									</div>

									<div className='register-field'>
										<input
											name='instagram'
											type='text'
											placeholder='instagram'
											value={instagram}
											onChange={handleChange}
										/>
									</div>

									<div className='register-field'>
										<input
											name='twitter'
											type='text'
											placeholder='twitter'
											value={twitter}
											onChange={handleChange}
										/>
									</div>
								</fieldset>
							</div>
							<div className='post-buttons'>
								<button className='btn' type='submit'>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

EditProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	EditProfileForm
);
