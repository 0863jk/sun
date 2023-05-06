import { API_BASE_URL } from "../api-config";

export async function call(api, method, request) {

    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return await fetch(options.url, options).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 403) {
            window.location.href = "/login";
        }

    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });
}

export async function signin(userDTO) {
    const response = await call("/account/postUser/", "POST", userDTO);
    if (response.token) {
        sessionStorage.setItem("ACCESS_TOKEN", response.token);
        window.location.href = "/";
    }
}

export function signout() {
    sessionStorage.removeItem("ACCESS_TOKEN")
    window.location.href = "/";
}

export function signup(userDTO) {
    return call("/account/postUser/", "POST", userDTO)
}