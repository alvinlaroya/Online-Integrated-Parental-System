/* import apiClient from '../' */
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export default {
  async getSubjectEvent() {
    return await axios.get(`${apiUrl}/subject/getSubjects`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async searchCaseEvent(payload) {
    return await axios.post(
      `${apiUrl}/case/searchCase`,
      { search: payload },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }
    );
  },

  async addSubjectEvent(payload) {
    return await axios.post(`${apiUrl}/subject/addSubject`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async updateSubjectEvent(payload) {
    return await axios.put(
      `${apiUrl}/subject/updateSubject/${payload.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }
    );
  },
};
