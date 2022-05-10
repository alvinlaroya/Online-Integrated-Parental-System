import EventService from "@/services/auth/Register.js";
import * as types from "@/store/mutation-types";
import router from "@/router";

export const getAddresses = ({ commit }) => {
  EventService.getAddressesEvent()
    .then((response) => {
      const barangayList =
        response.data["01"].province_list["PANGASINAN"].municipality_list[
          "SISON"
        ].barangay_list;
      commit(types.SET_ADDRESSES, barangayList);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const register = (_, payload) => {
  const {
    fname,
    mname,
    lname,
    email,
    password,
    address,
    birthDate,
    role,
    phone,
  } = payload;

  let status = 0;

  if (role === "SuperAdmin") {
    status = 1;
  } else if (role === "Admin") {
    status = 2;
  } else {
    status = 3;
  }

  const param = {
    fname,
    mname,
    lname,
    email,
    password,
    address,
    birthDate,
    status,
    phone,
  };
  EventService.registerEvent(param)
    .then((response) => {
      //
    })
    .catch((error) => {
      console.log(error);
    });
};

export const login = async ({ commit }, payload) => {
  await EventService.loginEvent(payload)
    .then(async (response) => {
      if (response.data == "Not verified user") {
        console.log("ID", response.data.id);
        return commit(types.SET_LOGIN_FAILED, true);
      }
      localStorage.setItem("token", response.data.token);
      await EventService.getCurrentUser(response.data.id).then(
        async (currentResponse) => {
          commit(types.SET_AUTH_INFO, currentResponse.data.user);
        }
      );

      if (response.data.status === 1 || response.data.status === 2) {
        router.replace("/dashboard"); // Super Admin Dashboard
      } else {
        router.replace("/guardian_dashboard"); // Guardian Dashboard
      }
    })
    .catch((error) => {
      console.log(error);
      commit(types.SET_LOGIN_FAILED, true);
    });
};

export const logOutUser = async ({ commit }) => {
  localStorage.removeItem("token");
  commit(types.LOG_OUT, {});
  router.replace("/");
};
