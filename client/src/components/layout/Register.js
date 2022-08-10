import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	let navigate = useNavigate();

	const { name, email, password, password2 } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ name, email, password });
			navigate('../Profile');
		}
	};

	const pstyles = {
		color: 'white',
		marginTop: '3rem',
	};

	return (
		<Fragment>
			<section className='background'>
				<section className='dark-overlay'>
					<section className='register-container'>
						<form className='register-form' onSubmit={handleSubmit}>
							<h3>
								Please enter your name, email and password to register your
								account for the site.
							</h3>
							<div className='fields'>
								<div className='register-field'>
									<label htmlFor='register-name'>
										Name:
										<input
											name='name'
											id='register-name'
											type='text'
											placeholder='Name'
											value={name}
											onChange={handleChange}
											// required
										/>
									</label>
								</div>
								<div className='register-field'>
									<label htmlFor='register-email'>
										Email:
										<input
											name='email'
											id='register-email'
											type='email'
											placeholder='Email Address'
											value={email}
											onChange={handleChange}
											// required
										/>
									</label>
								</div>
								<div className='register-field'>
									<label htmlFor='register-password'>
										Password:
										<input
											name='password'
											id='register-password'
											type='password'
											placeholder='Password'
											value={password}
											onChange={handleChange}
											// required
										/>
									</label>
								</div>
								<div className='register-field'>
									<label htmlFor='register-password2'>Password:</label>
									<input
										name='password2'
										id='register-password2'
										type='password'
										placeholder='Confirm your password'
										value={password2}
										onChange={handleChange}
										// required
									/>
								</div>
							</div>
							<button className='btn' type='submit'>
								Submit
							</button>
						</form>
						<p style={pstyles}>
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
};

export default connect(null, { setAlert, register })(Register);
