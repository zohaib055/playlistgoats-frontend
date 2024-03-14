/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { getEnvironmentConfig } from "../config";
import { axiosErrorHandler } from "../helper";
import authHeader from './auth-header';


const API_URL = `${getEnvironmentConfig().API_URL}/spotify`;

class SpotifyService {
    

    async getAnalytics(playlistId) {
        let data = await axios.get(API_URL + `/playlist/details?playlist_id=${playlistId}`, { headers: authHeader() }).catch(axiosErrorHandler)
        return data;
        
    }
    async getArtist(artist_id) {
        let data = await axios.get(API_URL + `/artist?artist_id=${artist_id}`, { headers: authHeader() }).catch(axiosErrorHandler)
        return data;
        
    }

    async getAlbums() {
        let data = await axios.get(API_URL + `/getAlbums`, { headers: authHeader() }).catch(axiosErrorHandler)
        return data;
        
    }

    async getAlbumsTracks(params) {
        let data = await axios.post(API_URL + `/getAlbumTracks`,params,{ headers: authHeader() }).catch(axiosErrorHandler)
        return data;
        
    }
}

export default new SpotifyService();
