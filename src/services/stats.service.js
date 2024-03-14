import axios from "axios";
import { getEnvironmentConfig } from "../config";
import { axiosErrorHandler } from "../helper";
import authHeader from './auth-header';


const API_URL = `${getEnvironmentConfig().API_URL}/chartmetric`;

class StatsService {
    async getArtist(searchKey,artistId) {
        let url = `/artist`
        if(searchKey) {
            url = `${url}?name=${searchKey}`
        }
        if(artistId) {
            url = `${url}?artistId=${artistId}`
        }
        let data = await axios.get(API_URL + url, { headers: authHeader() }).catch(axiosErrorHandler)
        return data;
    }

    async getArtistFans(artistId) {
        let data = await axios.get(API_URL + `/artist/fanmetrics/${artistId}`, { headers: authHeader() }).catch(axiosErrorHandler)
        return data;
        
    }

    async getArtistPlaylsit(artistsId) {
        let data = await axios.get(API_URL + `/artist/topPlaylistByFollowers/${artistsId}`, { headers: authHeader() }).catch(axiosErrorHandler)
        return data;
    }
}

export default new StatsService();
