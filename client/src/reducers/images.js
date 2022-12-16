import { ADD_IMAGES, GET_IMAGES, IMAGE_ERROR } from '../actions/types';

const initialState = {
	images: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_IMAGES:
    case ADD_IMAGES:
			return {
				...state,
				images: payload,
				loading: false,
			};
		default:
			return state;
	}
}
