import axios from "axios";
import { getLoggedUser } from "./logedUser";
const Deparment_BASE_API_URL = "/api/categoria";
class CategoriaService {
  async saveCategoria(data, token) {
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
  async getCategorias(token) {
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

export default new CategoriaService();
