import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { useNavigate } from 'react-router-dom';

const EditProfileForm = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
}) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		city: '',
		bio: '',
		company: '',
		position: '',
		school: '',
		program: '',
		interests: '',
		dob: '',
		facebook: '',
		instagram: '',
		twitter: '',
	});

	useEffect(() => {
		getCurrentProfile();

		setFormData({
			city: loading || !profile.city ? '' : profile.city,
			bio: loading || !profile.bio ? '' : profile.bio,
			company: loading || !profile.company ? '' : profile.company,
			position: loading || !profile.position ? '' : profile.position,
			school: loading || !profile.school ? '' : profile.school,
			program: loading || !profile.program ? '' : profile.program,
			interests: loading || !profile.interests ? '' : profile.interests,
			dob: loading || !profile.dob ? '' : profile.dob,
			facebook: loading || !profile.facebook ? '' : profile.facebook,
			instagram: loading || !profile.instagram ? '' : profile.instagram,
			twitter: loading || !profile.twitter ? '' : profile.twitter,
		});
	}, [loading]);

	const {
		city,
		bio,
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

	const handleSubmit = (e) => {
		e.preventDefault();
		const success = createProfile(formData, true);

		if (success) {
			navigate('/homepage');
		}
	};

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

									<input name='city' type='text' placeholder='City' value={city} onChange={handleChange}/>

									<div className='register-field'>
										Interests:{' '}
										<span className='small-text'>
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
											value={dob}
										/>
									</div>
								</fieldset>
								{/* WORK AND EDUCATION FIELDSET */}
								<fieldset>
									<legend>Work and Education</legend>

									<div className='register-field'>
										<input name='company' type='text' placeholder='Company' value={company}
											onChange={handleChange}/>
									</div>

									<div className='register-field'>
										<input name='position' type='text' placeholder='Position' value={position}
											onChange={handleChange}/>
									</div>

									<div className='register-field'>
										<input name='school' type='text' placeholder='school' value={school}
											onChange={handleChange}/>
									</div>

									<div className='register-field'>
										<input name='program' type='text' placeholder='program' value={school}
											onChange={handleChange}/>
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
										<input name='facebook' type='text' placeholder='facebook' value={facebook}
											onChange={handleChange}/>
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
										<input name='twitter' type='text' placeholder='twitter' value={twitter}
											onChange={handleChange}/>
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
