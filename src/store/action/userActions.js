import actionTypes from "./actionType";


export const login = (data) => {
    return {
        type: actionTypes.FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}