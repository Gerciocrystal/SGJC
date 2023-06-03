import axios from "axios";
import { getLoggedUser } from "./logedUser";
const Deparment_BASE_API_URL = "/api/departamento";
class DepartamentoService {
  async saveDepartamento(data, token) {
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
  async getDepartamentos(token) {
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

export default new DepartamentoService();
