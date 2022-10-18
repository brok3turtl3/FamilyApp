import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Hourglass from '../layout/Hourglass';
import { editPost, getPost } from '../../actions/post';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './EditPostForm.css';

const EditPostForm = ({ editPost, getPost, auth, post: { post, loading } }) => {
	const { id } = useParams();
	const [text, setText] = useState('');

	useEffect(() => {
		getPost(id);
	}, []);

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		editPost(id, { text });
		setText('');
	};

	return loading || post === null ? (
		<Hourglass />
	) : (
		<Fragment>
			<div className='edit-post-form'>
				<div className='overlay'>
					<div className='epf-inner'>
						<div className='epf-post'>
							<form onSubmit={handleSubmit}>
								<div className='subject'>
									<div>{post.name}</div>
									<div>{post.date.substring(0, 10)}</div>
									<div>{post.text}</div>
								</div>
								<div className='edit-post-field'>
									<textarea
										name=''
										id=''
										cols='30'
										rows='10'
										value={text}
										onChange={handleChange}
									></textarea>
								</div>

								<div className='epf-buttons'>
									<Link to='/posts' className='btn'>
										Back to Forums
									</Link>
									<button className='btn' type='submit'>
										Submit Edit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

EditPostForm.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPost, editPost })(EditPostForm);
