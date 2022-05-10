import EventService from "@/services/grade/Grade.js";
import * as types from "@/store/mutation-types";

export const fetchGrade = ({ commit }) => {
  EventService.getGradeEvent()
    .then((response) => {
      commit(types.SET_ALL_GRADE, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchGradeByStudent = ({ commit }, payload) => {
  EventService.getGradeByStudentEvent(payload)
    .then((response) => {
      commit(types.SET_ALL_GRADE, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addGrade = ({ commit }, payload) => {
  EventService.addGradeEvent(payload)
    .then((response) => {
      commit(types.ADD_SUBJECT, JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateGrade = ({ commit }, payload) => {
  EventService.updateGradeEvent(payload)
    .then((response) => {
      commit(types.UPDATE_GRADE, payload);
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
