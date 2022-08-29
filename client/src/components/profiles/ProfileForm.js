import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile} from '../../actions/profile'
import { useNavigate } from 'react-router-dom'

const ProfileForm = ({createProfile}) => {

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
		
    const success = createProfile(formData);

    if(success){
      navigate('/homepage')
    }
	};

	return (
		<Fragment>
			<section className='background'>
				<section className='dark-overlay'>
					<section className='register-container'>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<h1>placeholder</h1>
						<form className='register-form' onSubmit={handleSubmit}>
							<h3>
								Please enter any information you would like to add or update. Everything is optional.
							</h3>
							<div className='fields'>
								
                <fieldset>
                  <legend>General Information</legend>
                {/* CITY LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-city'>City:</label><br></br>
										
										<input
											name='city'
											id='profile-city'
											type='text'
											placeholder='City'
											value={city}
											onChange={handleChange}
											// required
										/>
									</div>
								
								{/* BIO LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-bio'>Bio:</label><br></br>
										
										<textarea
											name='bio'
											id='profile-bio'
											type='text'
											placeholder='Bio'
											value={bio}
											onChange={handleChange}
                      required
										></textarea>
									
								</div>

                {/* INTERESTS LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-bio'>Interests: <span className='small-text'>(Please use a comma seperated list. eg: "soccer, charities, working out" )</span></label><br></br>
										
										<input
											name='interests'
											id='profile-interests'
											type='text'
											placeholder='Interests'
											value={interests}
											onChange={handleChange}
										/>
								</div>

                {/* DOB LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-dob'>Date of Birth:</label><br></br>
										
										<input
											name='dob'
											id='profile-dob'
											type='date'
											
											value={dob}
											onChange={handleChange}
										/>
								</div>
							</fieldset>

              <fieldset>
                <legend>Work Information</legend>
                {/* COMPANY LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-company'>Company:</label><br></br>
										
										<input
											name='company'
											id='profile-company'
											type='text'
											placeholder='Company'
											value={company}
											onChange={handleChange}
										/>
								</div>
                {/* POSITION LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-position'>Position:</label><br></br>
										
										<input
											name='position'
											id='profile-position'
											type='text'
											placeholder='Position'
											value={position}
											onChange={handleChange}
										/>
								</div>
              </fieldset>

              <fieldset>
                <legend>Education</legend>
                {/* SCHOOL LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-school'>School:</label><br></br>
										
										<input
											name='school'
											id='profile-school'
											type='text'
											placeholder='school'
											value={school}
											onChange={handleChange}
										/>
								</div>
                {/* PROGRAM LABELS AND INPUTS */}
                <div className='register-field'>
									<label htmlFor='profile-program'>Program:</label><br></br>
										
										<input
											name='program'
											id='profile-program'
											type='text'
											placeholder='program'
											value={program}
											onChange={handleChange}
										/>
								</div>
                
              </fieldset>


              <fieldset>
                <legend>Socials Information</legend>
                {/* FACEBOOK LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-facebook'>Facebook:</label><br></br>
										
										<input
											name='facebook'
											id='profile-facebook'
											type='text'
											placeholder='facebook'
											value={facebook}
											onChange={handleChange}
										/>
								</div>
                {/* INSTAGRAM LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-instagram'>Instagram:</label><br></br>
										
										<input
											name='instagram'
											id='profile-instagram'
											type='text'
											placeholder='instagram'
											value={instagram}
											onChange={handleChange}
										/>
								</div>
                {/* TWITTER LABEL AND INPUT */}
                <div className='register-field'>
									<label htmlFor='profile-twitter'>Twitter:</label><br></br>
										
										<input
											name='twitter'
											id='profile-twitter'
											type='text'
											placeholder='twitter'
											value={twitter}
											onChange={handleChange}
										/>
								</div>
              </fieldset>
              
              
              
              </div>
							<button className='btn' type='submit'>
								Submit
							</button>
						</form>
					</section>
				</section>
			</section>
		</Fragment>
	);
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired
};



export default connect(null, { createProfile})(ProfileForm);
