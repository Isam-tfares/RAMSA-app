import { SET_USER_DATA, SET_LOGINED, SET_DISCONNECTED } from '../actions/userActions';

// Initial state
const initialState = {
    userData: null,
    isLogined: false,
};

// Reducer function
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        case SET_LOGINED:
            return {
                ...state,
                isLogined: true,
            }
        case SET_DISCONNECTED:
            return {
                ...state,
                isLogined: false,
            }
        default:
            return state;
    }
};

export default userReducer;
