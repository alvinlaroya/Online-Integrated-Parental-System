import {
  SET_ADDED_STUDENT,
  SET_ALL_STUDENTS,
  SET_CLEARANCE_BADGE,
  SET_CURRENT_CLEARANCE,
  SET_ISSUED_CLEARANCE_COUNT,
} from "../../../mutation-types";

export default {
  [SET_ALL_STUDENTS](state, data) {
    state.allStudents = data;
  },
  [SET_CLEARANCE_BADGE](state, data) {
    state.badges.all = data.allClearance.count;
    state.badges.verified = data.verifiedClearance.count;
  },
  [SET_CURRENT_CLEARANCE](state, data) {
    state.currentClearance = data;
  },
  [SET_ADDED_STUDENT](state, data) {
    state.allStudents.push(data);
  },
  [SET_ISSUED_CLEARANCE_COUNT](state, data) {
    state.issuedClearanceCount = data.allClearance.count;
  },
};
