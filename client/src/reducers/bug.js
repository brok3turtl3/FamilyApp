import {
	GET_BUGS,
	BUG_ERROR,
	ADD_BUG,
	DELETE_BUG,
	GET_BUG
} from '../actions/types';

const initialState = {
	bugs: [],
	bug: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_BUGS:
			return {
				...state,
				bugs: payload,
				loading: false,
			};
		case GET_BUG:
			return {
				...state,
				bug: payload,
				loading: false,
			};
		case ADD_BUG:
			return {
				...state,
				bugs: [payload, ...state.bugs],
				loading: false,
			};
			
		case DELETE_BUG:
			return {
				...state,
				bugs: state.bugs.filter((bug) => bug._id !== payload),
				loading: false,
			};
		
		
		
		case BUG_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
}