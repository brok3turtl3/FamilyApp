import React, { Fragment, useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

  const pstyles = {
    color: "white", 
    marginTop: "3rem"
    }

		const handleChange = (e) => {
			setFormData({...formData, [e.target.name]: e.target.value})
		}
		

  return (
    <Fragment>
    <section class="homepage">
			<div class="dark-overlay">
				<div class="homepage-inner">
					<h1 class="x-large">Family Matters</h1>
					<p class="lead">
						A private page for our family to get to know each other, share
						stories and stay in touch.
					</p>
				</div>
			</div>
		</section>

		<section class="register-container">
			<form class="register-form">
        <h3>Please enter your email and password to login.</h3>
        <div class="fields">
				
				<div class="register-field">
					<label for="register-email"
						>Email:<input
							name="email"
							id="register-email"
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={handleChange}
							required
					/></label>
				</div>
				<div class="register-field">
					<label for="register-password"
						>Password:<input
							name="password"
							id="register-password"
							type="text"
							placeholder="Password"
							value={password}
							onChange={handleChange}
							required
					/></label>
				</div>
				
        </div>
          <button class="btn">Submit</button>
				
			</form>
			<p style={pstyles}>Need an account?<Link to="/register"> Register here</Link></p>
		</section>
    </Fragment>
  )
}

export default Login;
