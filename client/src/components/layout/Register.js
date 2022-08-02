import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
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
			console.log('Passwords do not match');
		} else {
			const newUser = {
				name,
				email,
				password,
			};

			try {
				const config = {
					headers: {
						'Content-Type': 'application/json'
					}
				};

				const body = JSON.stringify(newUser);

				const res = await axios.post('/api/users', body, config);
				console.log(res.data);
				navigate('../Profile');

			} catch (error) {
				console.error(error.response.data);
			}
		}
	};

	const pstyles = {
		color: 'white',
		marginTop: '3rem',
	};

	return (
		<Fragment>
			<section class='homepage'>
				<div class='dark-overlay'>
					<div class='homepage-inner'>
						<h1 class='x-large'>Family Matters</h1>
						<p class='lead'>
							A private page for our family to get to know each other, share
							stories and stay in touch.
						</p>
					</div>
				</div>
			</section>

			<section class='register-container'>
				<form class='register-form' onSubmit={handleSubmit}>
					<h3>
						Please enter your name, email and password to register your account
						for the site.
					</h3>
					<div class='fields'>
						<div class='register-field'>
							<label for='register-name'>
								Name:
								<input
									name='name'
									id='register-name'
									type='text'
									placeholder='Name'
									value={name}
									onChange={handleChange}
									required
								/>
							</label>
						</div>
						<div class='register-field'>
							<label for='register-email'>
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
						<div class='register-field'>
							<label for='register-password'>
								Password:
								<input
									name='password'
									id='register-password'
									type='text'
									placeholder='Password'
									value={password}
									onChange={handleChange}
									required
								/>
							</label>
						</div>
						<div class='register-field'>
							<label for='register-password'>Password:</label>
							<input
								name='password2'
								id='register-password'
								type='text'
								placeholder='Confirm your password'
								value={password2}
								onChange={handleChange}
								required
							/>
						</div>




					</div>
					<button class='btn' type='submit'>
						Submit
					</button>
				</form>
				<p style={pstyles}>
					Already have an account?<Link to='/login'> Sign in here</Link>
				</p>
			</section>
		</Fragment>
	);
};

export default Register;
