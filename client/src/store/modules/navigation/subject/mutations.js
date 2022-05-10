import {
  SET_ALL_SUBJECT,
  SET_CASE_BADGE,
  SET_RELATED_CASE,
  ADD_SUBJECT,
  UPDATE_SUBJECT,
} from "../../../mutation-types";

export default {
  [SET_ALL_SUBJECT](state, data) {
    let subjects = [];
    data.map((subject) => {
      subjects.push({
        ...subject,
        name: `[${subject.code}] ${subject.description}`,
      });
    });
    state.allSubject = subjects;
  },
  [SET_CASE_BADGE](state, data) {
    state.badge = data;
  },
  [SET_RELATED_CASE](state, data) {
    state.relatedCase = data;
  },
  [ADD_SUBJECT](state, data) {
    state.allSubject.unshift(JSON.parse(data));
  },
  [UPDATE_SUBJECT](state, data) {
    console.log(data);
    /* objIndex = state.allCase.findIndex((obj) => obj.id == data.id);
    state.allCase[objIndex] = data */
  },
};
