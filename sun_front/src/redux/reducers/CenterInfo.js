const SET_CENTER_ID = 'center/set_center_id';
const SET_CENTER_NAME = 'center/set_center_name';
const SET_CENTER_MANAGER = 'center/set_center_manager';

const AuthInitialState = {
    center_id: null,
    center_name: null,
    center_manager: null,
}

export const setCenterId = (center_id) => ({
    type: SET_CENTER_ID,
    center_id
})
export const setCenterName = (center_name) => ({
    type: SET_CENTER_NAME,
    center_name
})
export const setCenterManager = (center_manager) => ({
    type: SET_CENTER_MANAGER,
    center_manager
})

export const CenterInfo = (state = AuthInitialState, action) => {
    switch (action.type) {
        case SET_CENTER_ID:
            return {
                ...state,
                center_id: action.center_id
            }
        case SET_CENTER_NAME:
            return {
                ...state,
                center_name: action.center_name
            }
        case SET_CENTER_MANAGER:
            return {
                ...state,
                center_manager: action.center_manager
            }
        default:
            return state;
    }
}