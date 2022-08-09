import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Login = ({ setAlert }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	let navigate = useNavigate();

	const pstyles = {
		color: 'white',
		marginTop: '3rem',
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const user = {
			email,
			password,
		};

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const body = JSON.stringify(user);

			const res = await axios.post('/api/auth', body, config);
			console.log(res.data);
			navigate('../Profile');
		} catch (error) {
			console.error(error.response.data);
			setAlert(error.response.data.errors[0].msg, 'danger');
		}
	};

	return (
		<Fragment>
			<section className='background'>
				<section className='dark-overlay'>
					<section className='register-container'>
						<form className='register-form' onSubmit={handleSubmit}>
							<h3>Please enter your email and password to login.</h3>
							<div className='fields'>
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
											required
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
											required
										/>
									</label>
								</div>
							</div>
							<button className='btn' type='submit'>
								Submit
							</button>
						</form>
						<p style={pstyles}>
							Need an account?<Link to='/register'> Register here</Link>
						</p>
					</section>
				</section>
			</section>
		</Fragment>
	);
};

Login.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Login);
