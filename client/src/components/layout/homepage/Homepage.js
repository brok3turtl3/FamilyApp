import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';
import { Link } from 'react-router-dom';
import Hourglass from '../Hourglass';
import Alert from '../Alert';
import './Homepage.css';
import { getImages } from '../../../actions/images';
import auth from '../../../reducers/auth';

const Homepage = ({
	getCurrentProfile,
	getImages,
	auth: { user },
	profile: { profile, loading },
	images: {images}
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	useEffect(() => {
		getImages();
	}, [getImages])

	return loading && profile === null ? (
		<Fragment>
			<Hourglass />
		</Fragment>
	) : (
		<Fragment>
			<section className='homepage-'>
				<section className='dark-overlay'>
					<section className='homepage-container'>
						<h1>Merry Christmas {user && user.name}!</h1>
						<br></br>
						{profile !== null ? (
							<Fragment>
								{profile?.image !== null ? (
									<div className='profile-img'>
										<img
											src={`${profile.image}?dontusecache`}
											alt='Placeholder'
										></img>
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
								<div className='medium'>
									<Alert />
								</div>
								{/* <div>
									{images.filter(image => 
										image.user === user._id
									).map((image) => {
										return <p>{image.user}</p>
									})
									}
								</div> */}
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
	getImages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	images: state.images
});

export default connect(mapStateToProps, { getCurrentProfile, getImages })(
	Homepage
);
