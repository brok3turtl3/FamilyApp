import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';
import { Link } from 'react-router-dom';
import Hourglass from '../Hourglass';

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
			<section className='background'>
				<section className='dark-overlay'>
					<section className='homepage-container'>
					<h1>Welcome {user && user.name}</h1>
					{profile !== null ? (
						<Fragment><div>{profile.bio}</div><div><Link to="/editprofile" className="btn btn-primary">Edit Profile</Link></div></Fragment> ) : (<Fragment>
							<p>You do not have a profile created, please add some information</p>
							<Link to='/profileform' className='btn btn-primary'>Create Profile</Link>
						</Fragment>)
					}
					
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
