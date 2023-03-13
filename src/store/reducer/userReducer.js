
import actionTypes from "../action/actionType";
const INITIAL_STATE = {
    userInfo: null,
    isLogin: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                userInfo: action.payload.DT,
                isLogin: true,
            };
        default: return state;
    }
};

export default userReducer;