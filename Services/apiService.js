// src/services/ApiService.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// You can replace this with your environment config
const API_URL = "https://quizzes.eversols.com/api/";

class ApiService { 
  constructor() {  
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });  

    // Auto attach token from AsyncStorage
    this.api.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Login example
  async login(data) {
    const response = await this.api.post("/auth/login", data);
    if (response?.data?.token) {
      await AsyncStorage.setItem("authToken", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response;
  }

  get(path, params = {}) {
    return this.api.get(path, { params });
  }

  post(path, data) {
    return this.api.post(path, data);
  }

  put(path, data) {
    return this.api.put(path, data);
  }

  delete(path) {
    return this.api.delete(path);
  }
}

export default new ApiService();