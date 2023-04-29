import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import type UserType from '../interfaces/UserType';
import { register, login } from '../lib/express-api/user';

export const useUsers = () => {
  const userStore = useUserStore();

  const { activeUser, authUser, users  } = storeToRefs(userStore);

  //Methods
  /* active user */
  const getActiveUser = () => {
    return activeUser;
  };

  const setActiveUser = (user: UserType | null) => {
    activeUser.value = user;
  };

  const getActiveUserFullname = () => {
    return getFullname(activeUser.value?.firstname, activeUser.value?.lastname);
  };

  /* auth user */
  const getAuthUser = () => {
    return authUser;
  };

  const setAuthUser = (user: UserType) => {
    authUser.value = user;
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

  const signUp = async (
    email: string,
    password: string,  
    firstname?: string,
    lastname?: string,
    alias?: string,
    image?: string,
  ) => {

    //TODO: JWT resigter

    try {
      const response = await register(email, password, firstname, lastname, alias, image);
      return response;
    } catch (error) {
      //TODO: notification error
      console.log(error);
    }

    // set auth user in store
    // userStore.setAuthUser(user);
  };

  const signIn = async (
    email: string,
    password: string,
  ) => {

    
    try {
      const response = await login(email, password);
      return response;
    } catch (error) {
      //TODO: notification error
      console.log(error);
    }
    
    //TODO: JWT login

    // set auth user in store
    // userStore.setAuthUser(user);
  };

  const updateActiveUser = (user: UserType) => {
    // TODO: update user in express

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(user);

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
    };

    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/user/', requestOptions)
        .then(response => response.text())
        .then(result => {
          
          // set active user in store
          userStore.setActiveUser(user);

          resolve(result);
        })
        .catch(error => reject(error));
    })
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
    setActiveUser,
    getActiveUserFullname,
    getAuthUser,
    setAuthUser,
    getAuthUserFullname,
    getUsers,
    setActiveUserByEmail,
    signUp,
    signIn,
    updateActiveUser,
  };
};
