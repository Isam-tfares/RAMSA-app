// Define action types
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_LOGINED = 'SET_LOGINED';
export const SET_DISCONNECTED = 'SET_DISCONNECTED';

// Action creator function
export const setUserData = (userData) => {
    return {
        type: SET_USER_DATA,
        payload: userData,
    };
};
export const setLogined = () => {
    return {
        type: SET_LOGINED,
    };
};
export const setDisconnected = () => {
    return {
        type: SET_DISCONNECTED,
    };
};
