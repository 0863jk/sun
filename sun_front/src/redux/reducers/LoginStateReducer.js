const SET_LOGIN_STATE = 'login_state/SET_LOGIN_STATE';

const InitialState = {
    login_state: false,
}

export const setLoginState = (login_state) => ({
    type: SET_LOGIN_STATE,
    login_state
})

export const LoginStateReducer = (state = InitialState, action) => {
    switch (action.type) {
        case SET_LOGIN_STATE:
            return {
                ...state,
                login_state: action.login_state
            }
        default:
            return state;
    }
}