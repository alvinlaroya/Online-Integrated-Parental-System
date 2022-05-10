import { SET_USERS, UPDATE_PERSONNEL } from "../../../mutation-types";

export default {
  [SET_USERS](state, data) {
    state.users = data.users.all.rows;
    state.parents = data.users.parents.rows;
  },
  [UPDATE_PERSONNEL](state, data) {
    console.log(data);
  },
};
