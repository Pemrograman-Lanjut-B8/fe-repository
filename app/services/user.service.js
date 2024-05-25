import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/profile';

class UserService {
  getProfile() {
    return axios.get(API_URL + "/", { headers: authHeader() });
  }

  updateProfile(profile) {
    return axios.put(API_URL + "/edit", profile, { headers: authHeader() });
  }
}

export default new UserService();