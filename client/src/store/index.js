import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate";
import Auth from "./modules/auth";
import Dashboard from "./modules/navigation/dashboard";
import Student from "./modules/navigation/student";
import Subject from "./modules/navigation/subject";
import Grade from "./modules/navigation/grade";
import Management from "./modules/navigation/management";

const dataState = createPersistedState({
  paths: ["auth.auth.user", "auth.auth.loggedIn"],
});

export default new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      modules: {
        auth: Auth,
      },
    },
    navigation: {
      namespaced: true,
      modules: {
        dashboard: Dashboard,
        student: Student,
        subject: Subject,
        grade: Grade,
        management: Management,
      },
    },
  },
  plugins: [dataState],
});
