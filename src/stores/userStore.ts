import { defineStore } from 'pinia';
import type UserType  from '../interfaces/UserType';

export const useUserStore = defineStore('user', {
  state: () => ({
    activeUser: null as UserType | null,
  }),

  actions: {
    setActiveUser(user: UserType) {
      this.activeUser = user;
    },
    cleanStore() {
      this.activeUser = null;
    },
  },
});
