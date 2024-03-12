import { authInstance } from "../utils/Instance";

export const getCenterMemberList = async (token, center_id) => {
    // 유저의 센터 리스트 불러오기
    try {
        const { data } = await authInstance(token).get(`center/member/list?center_id=${center_id}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const getCenterMemberListByRole = async (token, center_id, role) => {
    // 유저의 센터 리스트 불러오기
    try {
        const { data } = await authInstance(token).get(`center/member/get?center_id=${center_id}&role=${role}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postMember = async (token, data) => {
    try {
        return await authInstance(token).post('center/member/info', data)
            .then(response => {
                return response.statusText
            })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const insertMember = async (token, data) => {
    try {
        return await authInstance(token).post('center/member/insert', data)
            .then(response => {
                return response.status
            })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getMemberRegisterInfo = async (token, center_id, user_id) => {
    // 유저가 사용하는 수강권 불러오기
    try {
        const { data } = await authInstance(token).get(`center/member/registerinfo?center_id=${center_id}&user_id=${user_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const updateMember = async (token, member_id, data) => {
    try {
        return await authInstance(token).put(`center/member/info/${member_id}`, data)
            .then(response => {
                return response.status;
            })
            .catch(error => {
                return error.status;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const deleteMember = async (token, member_id) => {
    try {
        return await authInstance(token).delete(`center/member/info/${member_id}`)
            .then(response => {
                return response.status;
            })
            .catch(error => {
                return error.status;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}