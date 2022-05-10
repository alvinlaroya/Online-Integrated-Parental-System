import EventService from "@/services/student/Student.js";
import * as types from "@/store/mutation-types";

export const fetchStudents = ({ commit }) => {
  EventService.getStudentsEvent()
    .then((response) => {
      commit(types.SET_ALL_STUDENTS, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchStudentsByParent = ({ commit }, parentId) => {
  EventService.getStudentsByParentEvent(parentId)
    .then((response) => {
      commit(types.SET_ALL_STUDENTS, response.data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addStudent = ({ commit }, payload) => {
  EventService.addStudentEvent(payload)
    .then((response) => {
      commit(types.SET_ADDED_STUDENT, response.data.currentClearance);
    })
    .catch((error) => {
      console.log(error);
    });
};

/* export const addClearance = ({ commit }, payload) => {
  console.log("Fresh", ...payload);
  EventService.addClearanceEvent(payload)
    .then((response) => {
      commit(types.SET_ADDED_CLEARANCE, response.data.currentClearance);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const approveClearanceAction = (_, payload) => {
  EventService.approveClearanceEvent(payload)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setCurrentClearance = ({ commit }, payload) => {
  commit(types.SET_CURRENT_CLEARANCE, payload);
};

export const updateClearance = (_, payload) => {
  EventService.updateClearanceEvent(payload)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
 */
