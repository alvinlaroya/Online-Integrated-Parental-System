import EventService from "@/services/subject/Subject.js";
import * as types from "@/store/mutation-types";

export const fetchSubject = ({ commit }) => {
  EventService.getSubjectEvent()
    .then((response) => {
      console.log("SUBJECT", response.data);
      commit(types.SET_ALL_SUBJECT, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addSubject = ({ commit }, payload) => {
  EventService.addSubjectEvent(payload)
    .then((response) => {
      commit(types.ADD_SUBJECT, JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateSubject = ({ commit }, payload) => {
  EventService.updateSubjectEvent(payload)
    .then((response) => {
      commit(types.UPDATE_SUBJECT, payload);
    })
    .catch((error) => {
      console.log(error);
    });
};

/* export const searchCase = ({ commit }, payload) => {
  EventService.searchCaseEvent(payload)
    .then((response) => {
      commit(types.SET_RELATED_CASE, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addCase = ({ commit }, payload) => {
  EventService.addCaseEvent(payload)
    .then((response) => {
      commit(types.ADD_CASE, JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateCase = ({ commit }, payload) => {
  EventService.updateCaseEvent(payload)
    .then((response) => {
      commit(types.UPDATE_CASE, payload);
    })
    .catch((error) => {
      console.log(error);
    });
};
 */
