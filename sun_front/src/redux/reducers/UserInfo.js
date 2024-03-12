// 액션
const SET_USER_NAME = 'user_info/SET_USER';
const SET_ROLE = 'user_info/SET_ROLE';
const SET_FIRST_NAME = 'user_info/SET_FIRST_NAME';
const SET_LAST_NAME = 'user_info/SET_LAST_NAME';

// 초기값
const initialState = {
    username: null,
    last_name: null,
    first_name: null,
    role: null,
};

// 액션 생성 함수
export const setUserName = (username) => ({
    type: SET_USER_NAME,
    username
})
export const setRole = (role) => ({
    type: SET_ROLE,
    role
})
export const setFirstName = (first_name) => ({
    type: SET_FIRST_NAME,
    first_name
})
export const setLastName = (last_name) => ({
    type: SET_LAST_NAME,
    last_name
})

// 리덕스 스토어값 변경
export const UserInfo = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return {
                ...state,
                username: action.username
            }
        case SET_ROLE:
            return {
                ...state,
                role: action.role
            }
        case SET_FIRST_NAME:
            return {
                ...state,
                first_name: action.first_name
            }
        case SET_LAST_NAME:
            return {
                ...state,
                last_name: action.last_name
            }
        default:
            return state;
    }
}