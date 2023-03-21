import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import type UserType from '../interfaces/UserType';

export const useActiveUser = () => {
  const userStore = useUserStore();
  const { activeUser } = storeToRefs(userStore);

  //computed fullname
  const fullname = computed(() =>
    activeUser.value?.firstname !== undefined
      ? `${activeUser.value.firstname} ${activeUser.value.lastname}`
      : undefined,
  );

  //Methods
  const getActiveUser = () => {
    return activeUser;
  };

  const getActiveUserFullname = () => {
    return fullname;
  };

  const createUser = async (email: string, firstname: string, lastname: string, alias?: string) => {
    //create new user in firestore
    // const userId = await createUserDoc(email, firstname, lastname, alias);

    // const user: UserType = {
    //   id: userId,
    //   email: email,
    //   firstname: firstname,
    //   lastname: lastname,
    //   alias: alias,
    // };

    // // set active user in store
    // userStore.setActiveUser(user);
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

  const logoutUserTasks = () => {
    //clean user store
    userStore.cleanStore();
  };

  return {
    //Properties
    activeUser,

    //Computed
    fullname,

    //Methods
    getActiveUser,
    getActiveUserFullname,
    setActiveUserByEmail,
    createUser,
    updateActiveUser,
    logoutUserTasks,
  };
};
