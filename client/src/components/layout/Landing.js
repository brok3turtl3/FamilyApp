import React from 'react'
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <section className="landing-">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Family Matters</h1>
					<p className="medium">
						A private page for our family to get to know each other, share
						stories and stay in touch.
					</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">Register</Link>
						<Link to="/login" className="btn btn-primary">Login</Link>
					</div>
					<br />
					<a href="mailto:brok3turtl3@gmail.com"><p className='normal'>(Potential employers - click to contact me for a demo.)</p></a>
				</div>
			</div>
		</section>
  )
}

export default Landing;