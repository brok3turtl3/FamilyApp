import React from 'react'

const Landing = () => {
  return (
    <section className="homepage">
			<div className="dark-overlay">
				<div className="homepage-inner">
					<h1 className="x-large">Family Matters</h1>
					<p className="lead">
						A private page for our family to get to know each other, share
						stories and stay in touch.
					</p>
					<div className="buttons">
						<a href="register.html" className="btn btn-primary">Register</a>
						<a href="login.html" className="btn btn">Login</a>
					</div>
				</div>
			</div>
		</section>
  )
}

export default Landing;