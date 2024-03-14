import axios from "axios";
import { getEnvironmentConfig } from "./config";
import authHeader from "./services/auth-header";

const API_URL = getEnvironmentConfig().API_URL;

export const axiosErrorHandler = (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("user");
        axios.get(`${API_URL}/user/logout`, { headers: authHeader() })
    }
}

export let extractInstragramId = (text) => {
    let extractByAts = text?.split('@');
    let instagramId = ""
    for (let i = 1; i < extractByAts?.length; i++) {
        let previous = extractByAts[i - 1];
        let current = extractByAts[i];
        if (previous === '') {
            instagramId = current[i].split(' ')[0]
        } else if (previous[previous.length - 1] === ' ') {
            instagramId = current.split(' ')[0]
        }
        if (instagramId.length) {
            break;
        }
    }
    if (!instagramId.length) {
        return 'N/A'
    }
    return instagramId
}

export const getCategoryPopularity = (popularity) => {
    if (popularity >= 20 && popularity <= 0) {
        return "Bronze"
    } else if (popularity >= 21 && popularity <= 40) {
        return "Silver"
    } else if (popularity >= 41 && popularity <= 60) {
        return "Gold"
    } else {
        return "Diamond"
    }
}