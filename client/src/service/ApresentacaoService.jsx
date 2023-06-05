import axios from "axios";
import { getLoggedUser } from "./logedUser";
const Deparment_BASE_API_URL = "/api/apresentacao";

class ApresentacaoService {
  async saveApresentacao(data, token) {
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
  async getApresentacoes(token) {
    try {
      const response = await axios.get(
        Deparment_BASE_API_URL,
        getLoggedUser(token)
      );

      return response.data;
    } catch (error) {
      return null;
    }
  }
  async updadeApresentacao(apresentacao, token) {
    try {
      const response = await axios.put(
        Deparment_BASE_API_URL,
        apresentacao,
        getLoggedUser(token)
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async deleteApresentacao(id, token) {
    try {
      const response = await axios.delete(
        `${Deparment_BASE_API_URL}/${id}`,
        getLoggedUser(token)
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getMinhasApresentacoes(token) {
    try {
      const response = await axios.get(
        `${Deparment_BASE_API_URL}/minhas`,
        getLoggedUser(token)
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new ApresentacaoService();
