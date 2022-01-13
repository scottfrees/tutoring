import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import UserService from "@/api/users";
export default new Vuex.Store({
  state: {
    admins: [],
    staff: [],
    tutors: [],
    user: null,
    is_admin: false,
    is_staff: false,
    is_tutor: false
  },
  mutations: {
    users(state, users) {
      if (users) {
        state.admins = users.filter(u => u.roles.indexOf('admin') >= 0);
        state.staff = users.filter(u => u.roles.indexOf('staff') >= 0);
        state.tutors = users.filter(u => u.roles.indexOf('tutor') >= 0);
      } else {
        state.is_admin = state.is_staff = state.is_tutor = false;
      }
    },
    login(state, user) {
      state.user = user;
      if (user) {
        state.is_admin = user.roles.indexOf('admin') >= 0;
        state.is_staff = user.roles.indexOf('staff') >= 0;
        state.is_tutor = user.roles.indexOf('tutor') >= 0;
      }
      else {
        state.is_admin = state.is_staff = state.is_tutor = false;
      }
    },
  },
  actions: {
    async init({ commit }) {
      const users = await UserService.fetch();
      commit('users', users);
    }
  },
  modules: {
  }
})
