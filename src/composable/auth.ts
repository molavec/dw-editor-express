import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const authStore = useAuthStore();
  const { auth } = storeToRefs(authStore);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setAuth = (auth: any) => {
    //set authStore
    authStore.setAuth(auth);
  };

  const signUp = async () => {
    
  };

  return {
    //Properties
    auth,

    //Methods
    setAuth,
    signUp,
  };
};
