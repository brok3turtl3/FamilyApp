import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from './Alert';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		regCode: '',
		profilePic: 'https://cdn-jzo7ptov.files-simplefileupload.com/static/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOW9UQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--04bdbbf1d069b7afaf9f6059ddf144e3629636ba/Avatar.png'
	});

	let navigate = useNavigate();

	const { name, email, password, password2, regCode, profilePic } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else if( password.length < 6 || password2.length < 6) {
			setAlert('Passwords must be at least 6 characters', 'danger')
		}
		else {
			register({ name, email, password, regCode, profilePic });
			
		}
	};

	

	//REDIRECT IF LOGGED IN
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/Homepage');
		}
	});

	return (
		<Fragment>
			<section className='homepage'>
				<section className='dark-overlay'>
					<section className='auth-container'>
						<form className='auth-form' onSubmit={handleSubmit}>
							<p className="medium">
								Please enter your name, email and password to register your
								account for the site.
							</p>
							
							<Alert></Alert>
								<input
											name='name'
											id='register-name'
											type='text'
											placeholder='Name'
											value={name}
											onChange={handleChange}
											required
										/>
									
										<input
											name='email'
											id='register-email'
											type='email'
											placeholder='Email Address'
											value={email}
											onChange={handleChange}
											required
										/>
									
										<input
											name='password'
											id='register-password'
											type='password'
											placeholder='Password'
											value={password}
											onChange={handleChange}
											required
										/>
									
									<input
										name='password2'
										id='register-password2'
										type='password'
										placeholder='Confirm your password'
										value={password2}
										onChange={handleChange}
										required
									/>

<input
										name='regCode'
										id='regCode'
										type='text'
										placeholder='Enter registration code'
										value={regCode}
										onChange={handleChange}
										required
									/>
							<div className='auth-button'>
							<button className='btn btn-primary' type='submit'>
								Submit
							</button>
							</div>	
						</form>
						<p>
							Already have an account?<Link to='/login'> Sign in here</Link>
						</p>
					</section>
				</section>
			</section>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
