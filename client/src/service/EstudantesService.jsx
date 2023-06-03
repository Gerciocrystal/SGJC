import axios from "axios";
import { getLoggedUser } from "./logedUser";
const Deparment_BASE_API_URL = "/api/alumini";
class EstudamteService {
  configEmpty = {
    headers: {
      "Content-type": "application/json",
    },
  };

  async saveEstudante(data, token) {
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
  async getEstudantes(token) {
    try {
      const response = await axios.get(
        Deparment_BASE_API_URL,
        getLoggedUser(token)
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new EstudamteService();
