import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import type UserType from '../interfaces/UserType';
import { register } from '../lib/express-api/user';

export const useActiveUser = () => {
  const userStore = useUserStore();

  const { activeUser, authUser, users  } = storeToRefs(userStore);

  //Methods
  /* active user */
  const getActiveUser = () => {
    return activeUser;
  };

  const getActiveUserFullname = () => {
    return getFullname(activeUser.value?.firstname, activeUser.value?.lastname);
  };

  /* auth user */
  const getAuthUser = () => {
    return authUser;
  };

  const getAuthUserFullname = () => {
    return getFullname(authUser.value?.firstname, authUser.value?.lastname);
  };

  /* users */
  const getUsers = () => {
    return users;
  };
  
  const getFullname = (firstname: string | undefined, lastname: string | undefined)  => {
    if(firstname && lastname) return `${firstname} ${lastname}`;
    if(firstname) return `${firstname}`;
    if(lastname) return `${lastname}`;
    return undefined;
  };

  const createUser = async (
    email: string,
    password: string,  
    firstname?: string,
    lastname?: string,
    alias?: string,
    image?: string,
  ) => {

    //TODO: JWT resigter

    try {
      register(email, password, firstname, lastname, alias, image);
    } catch (error) {
      //TODO: notification error
      console.log(error);
    }

    // set auth user in store
    // userStore.setAuthUser(user);
  };

  const updateActiveUser = (user: UserType) => {
    // TODO: update user in firestore

    // set active user in store
    userStore.setActiveUser(user);
  };

  const setActiveUserByEmail = async (email?: string) => {
    console.log(email);
    // if (email) {
    //   //get user data from firestore
    //   const user = await getUserByEmail(email);

    //   // set active user in store
    //   userStore.setActiveUser(user);
    //   return user;
    // }
    // return null;
  };


  return {
    //Methods
    getActiveUser,
    getActiveUserFullname,
    getAuthUser,
    getAuthUserFullname,
    getUsers,
    setActiveUserByEmail,
    createUser,
    updateActiveUser,
  };
};
