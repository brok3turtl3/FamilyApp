import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteBug } from '../../actions/bug';
import Linkify from 'react-linkify';

const IndividualBug = ({
	deleteBug,

	auth,
	bug: { _id, subject, text, name, user, comments, date, image },
}) => {
	return (
		<div className='posts'>
			<div className='subject'>
				
				
				<div className='img-thumb'>
					<img src='' alt='PH'></img>
				</div>

				<div className="poster-info">
					<div>{name}</div>
					<div>{date.substring(0, 10)}</div>
				</div>

				<div className="post-delete">
					{!auth.loading && user === auth.user._id && (
						<Fragment>


						<i
							onClick={(e) => deleteBug(_id)}
							className='fa-solid fa-trash hover-danger'
						>
							{' '}
							X
						</i></Fragment>
					)}
				</div>
			</div>
			<Linkify
				componentDecorator={(decoratedHref, decoratedText, key) => (
					<a
						target='blank'
						style={{ color: 'yellow' }}
						href={decoratedHref}
						key={key}
					>
						{decoratedText}
					</a>
				)}
			>
				<div className='body'>{text}</div>
			</Linkify>
			{image ? <img src={image} alt='ph'></img> : null}
			<div className='post-buttons'>
				
			</div>
		</div>
	);
};

IndividualBug.propTypes = {
	bug: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteBug: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteBug })(IndividualBug);
