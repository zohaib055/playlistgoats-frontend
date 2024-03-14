import axios from "axios";
import { getEnvironmentConfig } from "../config";
import { axiosErrorHandler } from "../helper";
import authHeader from './auth-header';


const API_URL = `${getEnvironmentConfig().API_URL}/user/`;

class UserService {
    async getChats() {
        let data = await axios.get(API_URL + "getChats", { headers: authHeader() }).catch(axiosErrorHandler)
        return data;
    }

    getPlaylistInfo(playlistId) {
        return axios.post(API_URL + "getPlaylistInfo", {
            playlistId
        }, { headers: authHeader() }).then((response) => {
            return response.data;
        }).catch(axiosErrorHandler);
    }

    sendMsg(msg, chatId, playlistId) {
        return axios.post(API_URL + "sendMsg", {
            msg, chatId, playlistId
        }, { headers: authHeader() }).then((response) => {
            return response.data;
        }).catch(axiosErrorHandler);
    }


    getSavedPlaylist() {
        console.log(authHeader(), "authHeader()")
        return axios.get(API_URL + "savedPlaylist", { headers: authHeader() }).then((response) => {
            return response.data;
        }).catch(axiosErrorHandler);
    }

    deleteSavedPlaylist(playlistId) {
        return axios.delete(API_URL + `savedPlaylist?playlistId=${playlistId}`, { headers: authHeader() }).then((response) => {
            return response.data;
        }).catch(axiosErrorHandler);
    }

    addSavedPlaylist(playlistData) {
        return axios.post(API_URL + `savedPlaylist`, playlistData, { headers: authHeader() }).then((response) => {
            return response.data;
        }).catch(axiosErrorHandler);
    }

    deleteChat(chatId) {
        return axios.post(API_URL + "chat/delete", {
            chatId
        }, { headers: authHeader() }).then((response) => {
            console.log(response)
            return response.data;
        }).catch(axiosErrorHandler);
    }
}

export default new UserService();
