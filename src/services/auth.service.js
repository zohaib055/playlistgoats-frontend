import axios from 'axios';
import { getEnvironmentConfig } from '../config';
import authHeader from './auth-header';

const API_URL = `${getEnvironmentConfig().API_URL}/auth/`;

class AuthService {
  login(email, password, ipAddress) {
    return axios
      .post(API_URL + 'login', { email, password, ipAddress })
      .then((response) => {
        console.log(response, 'response!!');
        if (response.data.error) {
          alert(response.data.message);
          return Promise.reject(false);
        }
        if (response.data.jwt) {
          let userData = response.data;
          localStorage.setItem('user', JSON.stringify(userData));
        }
        return response.data;
      })
      .catch((e) => {
        console.log(e, ' ERROR IN CARCH');
      });
  }

  logout() {
    const API_URL = `${getEnvironmentConfig().API_URL}/user/logout`;
    axios.get(API_URL, { headers: authHeader() });
    localStorage.removeItem('user');
    localStorage.removeItem('TIMER');

    return;
  }

  signup(params) {
    return axios.post(API_URL + 'signup-v2', params);
  }

  editCard(params) {
    return axios.put(API_URL + 'stripe/card', {
      ...params
    }, { headers: authHeader() });
  }

  pauseSubscription(params) {
    return axios.put(API_URL + 'stripe/subscription/pause', {
      ...params
    }, { headers: authHeader() });
  }
  resumeSubscription(params) {
    return axios.put(API_URL + 'stripe/subscription/resume', {
      ...params
    }, { headers: authHeader() });
  }

  getCards() {
    return axios.get(API_URL + 'stripe/card', { headers: authHeader() });
  }


  getCustomerSubscription() {
    return axios.get(API_URL + 'stripe/subscription', { headers: authHeader() });
  }

  forgotPassword(email) {
    return axios.post(API_URL + 'forgotpassword', {
      email,
    });
  }

  resetPassword(email, fpCode, password) {
    return axios.post(API_URL + 'verify', {
      email,
      fpCode,
      password,
    });
  }

  adminResetPassword(email, password) {
    return axios.post(
      API_URL + 'reset/password',
      {
        email,
        password,
      },
      { headers: authHeader() }
    );
  }

  requestTrailAccount(toEmail) {
    return axios.post(API_URL + 'testAcount', {
      toEmail,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
