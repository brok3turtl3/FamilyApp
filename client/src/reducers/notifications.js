import { ADD_NOTIFICATION, DELETE_NOTIFICATION, NOTIFICATION_ERROR, CLEAR_NOTIFICATIONS, GET_NOTIFICATIONS } from "../actions/types";

const initialState = {
  notifications: [],
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload} = action;

  switch(type){
case ADD_NOTIFICATION:
  return {
    ...state,
    notifications: payload,
    loading: false
  };
  case DELETE_NOTIFICATION:
    return {
      ...state,
      notifications: state.notifications.filter((notification) => notification._id !== payload),
      loading: false
    }
  case CLEAR_NOTIFICATIONS:
    return {
      ...state,
      notifications: [],
      loading: false
    };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload,
        loading: false
      }

    default:
      return state;
  }
}