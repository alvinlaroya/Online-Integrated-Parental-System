/* import apiClient from '../' */
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export default {
  async getGradeEvent() {
    return await axios.get(`${apiUrl}/grade/getGrade`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async getGradeByStudentEvent(payload) {
    return await axios.post(`${apiUrl}/grade/getGradeByStudent`, payload, {
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

  async addGradeEvent(payload) {
    return await axios.post(`${apiUrl}/grade/addGrade`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  },

  async updateGradeEvent(payload) {
    return await axios.put(
      `${apiUrl}/grade/updateGrade/${payload.id}`,
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
