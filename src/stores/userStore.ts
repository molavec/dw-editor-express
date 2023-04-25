import { defineStore } from 'pinia';
import type UserType  from '../interfaces/UserType';

export const useUserStore = defineStore('user', {
  state: () => ({
    activeUser: null as UserType | null,
    authUser: null as UserType | null,
    users: null as UserType[] | null,
  }),

  actions: {
    setActiveUser(user: UserType) {
      this.activeUser = user;
    },
    setAuthUser(user: UserType) {
      this.authUser = user;
    },
    setUsers(users: UserType[]) {
      this.users = users;
    },
    cleanActiveUser() {
      this.activeUser = null;
    },
    cleanUsers() {
      this.users = null;
    },
    cleanAuthUser() {
      this.authUser = null;
    },
  },
});
