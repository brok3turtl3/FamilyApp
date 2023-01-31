import {
	GET_POST_REQUEST,
	GET_POST_SUCCESS,
	EDIT_POST_REQUEST,
	EDIT_POST_SUCCESS,
	EDIT_POST_RESET,
} from '../actions/types';

const initialState = {
	post: {},
	postEdit: {success: false},
	loading: true,
  success: false
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POST_REQUEST:
			return {
				...state,

				loading: true,
			};
		case GET_POST_SUCCESS:
			return {
				...state,
				post: payload,
				loading: false,
        success: true
			};
      case EDIT_POST_REQUEST:
        return {
          ...state,
          loading: true
        }
        case EDIT_POST_SUCCESS:
          return {
            ...state,
            postEdit: { success: true},
            loading: false
          }
          case EDIT_POST_RESET:
            return {
              
              post: {},
              postEdit: {success: false},
              loading: true,
              success: false
            }
		default:
			return state;
	}
}
