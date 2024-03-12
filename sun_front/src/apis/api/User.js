import { authInstance, defaultInstance } from "../utils/Instance";

export const getUserData = async (username) => {
    try {
        // const { data } = await defaultInstance.get(`account/getUsername/${username}`);
        const { data } = await authInstance(username).get(`auth/user/`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getUserDatas = async () => {
    try {
        const { data } = await defaultInstance.get(`account/getUserDatas`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateUserData = async (token, data) => {
    try {
        return await authInstance(token).patch('auth/user/', data)
            .then(response => {
                // 서버로부터의 응답 처리
                return response.status;
            })
            .catch(error => {
                console.log(error);
                return error;
                // throw error; // 에러 처리를 위해 예외 던지기
            });
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const logIn = async (data) => {
    try {
        return await defaultInstance.post('auth/login/', data)
            .then(response => {
                // 서버로부터의 응답 처리
                const { access_token, refresh_token } = response.data; // access token 및 refresh token
                const userDetail = response.data.user; // 사용자 세부 정보

                return { access_token, refresh_token, userDetail };
            })
            .catch(error => {
                return error;
                // throw error; // 에러 처리를 위해 예외 던지기
            });
    } catch (error) {
        console.error(error);
    }
}

export const signUp = async (data) => {
    try {
        return await defaultInstance.post('auth/registration/', data)
            .then(response => {
                // 서버로부터의 응답 처리
                const { access_token, refresh_token } = response.data; // access token 및 refresh token
                const userDetail = response.data.user; // 사용자 세부 정보

                return { access_token, refresh_token, userDetail };
            })
            .catch(error => {
                return error;
                // throw error; // 에러 처리를 위해 예외 던지기
            });
    } catch (error) {
        console.error(error);
    }
}

export const logOut = async () => {
    return await defaultInstance.post('auth/logout/')
        .then(response => {
            return response.status
        })
}

export const isAccessTokenExpired = async (token) => {
    return await defaultInstance.post('auth/token/verify/', { token: token })
        .then(response => {
            // 서버로부터의 응답 처리
            return response.status
        }).catch(error => {
            console.log(error);
            return error.response.status
        })
}

export const refreshAccessToken = async (token) => {
    // Refresh Token과 함께 서버로 요청 보내기
    return await defaultInstance.post('auth/token/refresh/', { refresh: token })
        .then(response => {
            const { access, refresh, access_token_expiration } = response.data;
            return { access, refresh, access_token_expiration };
        });
};

export const searchUser = async (token, role, option, word) => {
    try {
        const { data } = await authInstance(token).get(`account/search?role=${role}&${option}=${word}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const searchUserInCenter = async (token, role, center_id, option, word) => {
    try {
        const { data } = await authInstance(token).get(`center/${role}/search?center_id=${center_id}&${option}=${word}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
