import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import type UserType from '../interfaces/UserType';

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

    // TODO: Create user 
    // create new user in firestore
    // const userId = await createUserDoc(email, firstname, lastname, alias);

    const user = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      alias: alias,
      image: image,
    };

    console.log('user', user);

    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    };

    fetch('http://localhost:3000/user', options)
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
      })
      .catch(err => {
        console.log('err', err);
        throw err;
      });

    // set auth user in store
    // userStore.setAuthUser(user);
  };

  const updateActiveUser = (user: UserType) => {
    // TODO: update user in firestore

    // set active user in store
    userStore.setActiveUser(user);
  };

  const setActiveUserByEmail = async (email?: string) => {
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
