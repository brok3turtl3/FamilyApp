import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { useNavigate } from 'react-router-dom';
import SimpleFileUpload from 'react-simple-file-upload';

const ProfileForm = ({ createProfile }) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		city: '',
		bio: '',
		smallBio: '',
		company: '',
		image:
			'https://cdn-jzo7ptov.files-simplefileupload.com/static/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOW9UQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--04bdbbf1d069b7afaf9f6059ddf144e3629636ba/Avatar.png',
		position: '',
		school: '',
		program: '',
		interests: '',
		dob: '',
		facebook: '',
		instagram: '',
		twitter: '',
	});

	const {
		city,
		bio,
		smallBio,
		company,
		image,
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

	const handleSubmit = (e) => {
		e.preventDefault();

		const success = createProfile(formData);

		if (success) {
			navigate('/homepage');
		}
	};

	function handleFile(url) {
		setFormData({ ...formData, image: url });
	}

	return (
		<Fragment>
			<div className='homepage'>
				<div className='profile-overlay'>
					<div className='profile-container'>
						<div className='heading'>Create Profile</div>
						<p className='medium-text m-bottom'>
							Please enter any information you would like to add or update.
							Everything is optional.
						</p>

						<form className='edit-profile' onSubmit={handleSubmit}>
							<div className='fieldset-container'>
								{/* GENERAL INFO FIELDSET */}
								<fieldset>
									<legend>General Information</legend>
									<div className='register-field'>
										<input
											name='city'
											type='text'
											placeholder='City'
											value={city}
											onChange={handleChange}
										/>
									</div>
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
										<label htmlFor='profile-dob'>Date of Birth:</label>

										<input
											name='dob'
											type='date'
											placeholder='Date of Birth'
											onChange={handleChange}
											//TODO*** FIGURE OUT HOW TO DISPLAY EXISTING DOB IN EDIT FORM
											//value={dob}
										/>
									</div>
								</fieldset>
								{/* WORK AND EDUCATION FIELDSET */}
								<fieldset>
									<legend>Work / Education and Thumbnail Bio</legend>

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

									<div className='register-field'>
										<textarea
											name='smallBio'
											type='text'
											placeholder='Provide a few lines about yourself for your small profile on Profiles page ( 200 characters max)'
											value={smallBio}
											onChange={handleChange}
											maxLength='150'
											rows='8'
										></textarea>
									</div>
								</fieldset>

								{/* BIO FIELDSET  */}
								<fieldset>
									<legend>Detailed Bio Info</legend>

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
								<fieldset>
									<legend>Upload a photo</legend>
									<SimpleFileUpload
										apiKey='5af8bfef1fbeedd25af3de7ae9e6b36a'
										onSuccess={handleFile}
									/>
									<p>Upload a pic</p>
									<p>Click to browse or drag and drop</p>
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

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(ProfileForm);
