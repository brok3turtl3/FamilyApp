import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SmallProfile = ({
	profile: {
		user: { _id, name },
		city,
		bio,
	},
}) => {
	return (
		<div className='small-profile'>
			<div className="sm-pr-field"><h2>{name}</h2></div>
			<div className="sm-pr-field"><h1>{city}</h1></div>
			<div className="sm-pr-field"><p>{bio}</p></div>
			<Link to={`/profile/${_id}`} className='btn btn-primary'>
				Detailed Profile
			</Link>
		</div>
	);
};

SmallProfile.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default SmallProfile;
