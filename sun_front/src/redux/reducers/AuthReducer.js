const SET_TOKEN = 'token/set_token';

const AuthInitialState = {
    access_token: null
}

export const setToken = (access_token) => ({
    type: SET_TOKEN,
    access_token
})

export const AuthReducer = (state = AuthInitialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                access_token: action.access_token
            }
        default:
            return state;
    }
}