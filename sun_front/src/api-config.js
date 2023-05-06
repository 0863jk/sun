let backendHost;

const hostName = window && window.location && window.location.hostname;

if(hostName === "localhost"){
    backendHost = "http://localhost:8000";
    console.log("Backend host is " + backendHost);
}

export const API_BASE_URL = `${backendHost}`;