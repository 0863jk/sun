// export const getUser = (rawData) => {
//     const data = {
//         access_token: rawData.access_token,
//         refresh_token: rawData.refresh_token,
//         username: rawData.userDetail.username,
//         first_name: rawData.userDetail.first_name,
//         last_name: rawData.userDetail.last_name,
//         role: rawData.userDetail.role,
//     }
//     console.log(data);
//     return data;
// }
export const getUser = (rawData) => {
    const data = {
        username: rawData.username,
        name: rawData.first_name + rawData.last_name,
        phone: rawData.phone1 + '-' + rawData.phone2 + '-' + rawData.phone3,
        role: rawData.role,
        email: rawData.email
    }
    return data;
}

export const getUserList = (rawData) => {
    return rawData.map(
        ({ username, first_name, last_name, phone1, phone2, phone3, email, role }) => {
            return {
                username: username,
                name: last_name + first_name,
                phone: phone1 + '-' + phone2 + '-' + phone3,
                email: email,
                role: role,
            }
        }
    )
}