import axios from "axios";
import { getEnvironmentConfig } from "../config";
import authHeader from './auth-header';

const API_URL = `${getEnvironmentConfig().API_URL}/admin/`;

class AdminService {
    getData() {
        return axios.get(API_URL + "getData", {headers: authHeader()})
    }

    createPromo(playlistId) {
        return axios
          .post(API_URL + "createPromo", { playlistId }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }

      deletePromo(playlistId) {
        return axios
          .post(API_URL + "deletePromo", { playlistId }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }

      createAc(ac,genres) {
        return axios
          .post(API_URL + "createAc", { ac,genres }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }

      deleteAc(ac) {
        return axios
          .post(API_URL + "deleteAc", { ac }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }
      
      unBanIp(banIpId) {
        return axios
          .post(API_URL + "ip/delete", { banIpId }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }

      generateReferralCode(id) {
        return axios
          .post(API_URL + "ref", { id }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }

      updateEmail(type,textEmail) {
        return axios
          .post(API_URL + "updateEmail", { type,textEmail }, { headers: authHeader() })
          .then((response) => {
            return response.data;
          });
      }

      getAnalyticsData() {
        return axios.get(API_URL + "analytics", {headers: authHeader()})
    }
      
}

export default new AdminService();
