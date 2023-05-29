import axios from "axios";
import { getLoggedUser, getConfig } from "./logedUser";
const Deparment_BASE_API_URL = "/api/reclamacao";
class ReclamacaoService {
  async saveReclamacao(data) {
    try {
      const response = await axios.post(
        Deparment_BASE_API_URL,
        data,
        getConfig()
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }
  async getReclamacoes(token) {
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

export default new ReclamacaoService();
