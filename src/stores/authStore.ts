import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: null,
  }),

  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setAuth(auth: any) {
      this.auth = auth;
    },
  },
});
