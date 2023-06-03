import axios from "axios";
import { getLoggedUser } from "./logedUser";
const Deparment_BASE_API_URL = "/api/notificacao";
class NotificacaoService {
  async saveNotificacao(data, token) {
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
  async getNotificacao(token) {
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
  async updadeNotificacao(_id, token) {
    try {
      const response = await axios.put(
        `${Deparment_BASE_API_URL}/${_id}`,
        getLoggedUser(token)
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async deleteNotificacao(_id, token) {
    try {
      const response = await axios.delete(
        `${Deparment_BASE_API_URL}/${_id}`,
        getLoggedUser(token)
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new NotificacaoService();
