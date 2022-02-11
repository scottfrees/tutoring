import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import UserService from "@/api/users";
import RoomService from "@/api/rooms";
export default new Vuex.Store({
  state: {
    admins: [],
    staff: [],
    tutors: [],
    rooms: [],
    user: null,
    is_admin: false,
    is_staff: false,
    is_tutor: false,
    ts: null,
  },
  mutations: {
    users(state, users) {
      if (users) {

        state.admins = users.filter(u => u.roles.indexOf('admin') >= 0).sort((a, b) => a.name.last.localeCompare(b.name.last));
        state.staff = users.filter(u => u.roles.indexOf('staff') >= 0).sort((a, b) => a.name.last.localeCompare(b.name.last));
        state.tutors = users.filter(u => u.roles.indexOf('tutor') >= 0).sort((a, b) => a.name.last.localeCompare(b.name.last));

      } else {
        state.is_admin = state.is_staff = state.is_tutor = false;
      }
    },
    rooms(state, rooms) {
      state.rooms = rooms;
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
    tutoring_session(state, session) {
      state.ts = session;
    }
  },
  actions: {
    async init({ commit }) {
      const users = await UserService.fetch();
      commit('users', users);

      const rooms = await RoomService.fetch();
      commit('rooms', rooms);
    }
  },
  modules: {
  }
})
