import Vue from "vue";

export const authState = Vue.observable({
  isAuthenticated: false,
  user: null,
});

export const setAuth = (user) => {
  authState.isAuthenticated = !!user;
  authState.user = user;
};

export const clearAuth = () => {
  authState.isAuthenticated = false;
  authState.user = null;
};
