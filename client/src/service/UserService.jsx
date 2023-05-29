import axios from "axios";
import { getLoggedUser, getConfig } from "./logedUser";
const Deparment_BASE_API_URL = "/api/user";
class UsersService {
  configEmpty = {
    headers: {
      "Content-type": "application/json",
    },
  };

  async saveUser(data, token) {
    try {
      const response = await axios.post(
        Deparment_BASE_API_URL,
        data,
        getLoggedUser(token)
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }
  async Login(data) {
    try {
      const response = await axios.post(
        `${Deparment_BASE_API_URL}/login`,
        data,
        getConfig()
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new UsersService();
