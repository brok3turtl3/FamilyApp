import {
	GET_POSTS,
	POST_ERROR,
	ADD_POST,
	DELETE_POST,
	UPDATE_LIKES,
	UPDATE_LAUGHS,
	
	ADD_COMMENT,
	DELETE_COMMENT
} from '../actions/types';

const initialState = {
	posts: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		
		case ADD_POST:
			return {
				...state,
				posts: [payload, ...state.posts],
				loading: false,
			};
			
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
				loading: false,
			};
		// case ADD_COMMENT:
		// 	return {
		// 		...state,
		// 		post: { ...state.post, comments: payload },
		// 		loading: false,
		// 	};
		case ADD_COMMENT:
			console.log(payload._id)
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? {...post, comments: payload.comments} : post
				),
				loading: false
			};
		// case DELETE_COMMENT:
		// 	return {
		// 		...state,
		// 		post: {
		// 			...state.post,
		// 			comments: state.post.comments.filter(
		// 				(comment) => comment._id !== payload
		// 			),
		// 		},
		// 		loading: false
		// 	};
		case DELETE_COMMENT:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? {...post, comments: payload.comments} : post
				),
				loading: false
			};
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? { ...post, likes: payload.likes } : post
				),
				loading: false,
			};
			case UPDATE_LAUGHS:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? { ...post, laughs: payload.laughs } : post
				),
				loading: false,
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
}
