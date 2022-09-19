import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import { deleteBug } from '../../actions/bug';
import Linkify from 'react-linkify';

const IndividualBug = ({
	deleteBug,
	
	auth,
	bug: { _id, subject, text, name, user, comments, date, image},
}) => {
	return (
		<div className='posts'>
			<div className='subject'>
				<div>SUBJECT : {subject}</div>
				<div>BY : {name}</div>
				<div>POSTED ON : {date.substring(0,10)}</div>
			</div>
			<Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
        <a target="blank" style={{color: 'yellow'}} href={decoratedHref} key={key}>
            {decoratedText}
        </a>
    )}>
			<div className='body'>{text}</div>
			</Linkify>
			{image ? (<img src={image} alt="ph"></img>) : null}
			<div className='post-buttons'>
				
				
				{!auth.loading && user === auth.user._id && (
					<Fragment>
					
					<button
						className='btn'
						type='button'
						onClick={(e) => deleteBug(_id)}
					>
						Delete Post
					</button>
					</Fragment>
				)}
			</div>
		</div>
	);
};

IndividualBug.propTypes = {
	bug: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteBug})(
	IndividualBug
);
