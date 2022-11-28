import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';
import { Link } from 'react-router-dom';
import Hourglass from '../Hourglass';
import Alert from '../Alert';
import './Homepage.css';

const Homepage = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Fragment>
			<Hourglass />
		</Fragment>
	) : (
		<Fragment>
			<section className='homepage-'>
				<section className='dark-overlay'>
					<section className='homepage-container'>
						<h1>Welcome {user && user.name}</h1>
						{profile !== null ? (
							<Fragment>
								{profile?.image !== null ? (
									<div className='profile-img'>
										{/* <img src={`${profile.image + "?dontusecache"}`} alt='Placeholder'></img> */}
										<img src={`${profile.image}?dontusecache`} alt='Placeholder'></img>
									</div>
								) : null}
								
								
								<div>
									<Link to='/editprofile' className='btn btn-primary'>
										Edit Profile
									</Link>
								</div>
								<div>
									<Link to='/editaccountinfo' className='btn btn-primary'>
										Edit Account Info
									</Link>
								</div>
								<div className="medium"><Alert /></div>
							</Fragment>
						) : (
							<Fragment>
								<p>
									You do not have a profile created, please add some information
								</p>
								<Link to='/profileform' className='btn btn-primary'>
									Create Profile
								</Link>
							</Fragment>
						)}
					</section>
				</section>
			</section>
		</Fragment>
	);
};

Homepage.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Homepage);
