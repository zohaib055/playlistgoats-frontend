import axios from "axios";
import { getEnvironmentConfig } from "../config";
import { axiosErrorHandler } from "../helper";
import authHeader from './auth-header';


const API_URL = `${getEnvironmentConfig().API_URL}/artist/`;


class ArtistService {
    search(keys) {
        return axios
          .post(API_URL + "search", { keys }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }

      newRequest(playlistId,playlistEmail,playlistName,track_id,track_name) {
        return axios
          .post(API_URL + "newRequest", { playlistId,playlistEmail,playlistName,track_id,track_name }, { headers: authHeader() })
          .then((response) => {
            if(response?.data?.error) {
              console.log("In Reject")
              return Promise.reject(response?.data?.message)
            }
            return response.data;
          })
      }

      searchArtist(query) {
        return axios
          .post(API_URL + "searchArtist", { query }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }

      setMyArtist(artistId,artistName,spotifyArtistPopularity) {
        return axios
          .post(API_URL + "setMyArtist", { artistId,artistName,spotifyArtistPopularity }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }

      getPromoPlaylist() {
        return axios.get(API_URL + "getPromoPlaylist", {headers: authHeader()}).catch(axiosErrorHandler);
      }
}

export default new ArtistService();
