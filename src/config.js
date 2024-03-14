const isLocalhost = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? true : false;


const Config = {
    "development": {
        "API_URL" : "http://localhost:3500",
        "SOCKET_URL" : "http://localhost:3500/"
    },
    "production" : {
        "API_URL" : "https://api.playlistgoats.com",
        "SOCKET_URL" : "https://api.playlistgoats.com/"
    }
}


const currentEnvironment = isLocalhost ? "development" : "production"

export const getEnvironmentConfig = () => {
    return Config[currentEnvironment];
} 