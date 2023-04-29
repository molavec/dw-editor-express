const register = (
  email: string,
  password: string,
  firstname: string | undefined,
  lastname: string | undefined,
  alias: string | undefined,
  image: string | undefined,
) => {
  // json object to create user
  const user = {
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
    alias: alias,
    image: image,
  };

  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  };

  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/user/register', options)
      .then((res) => res.json())
      .then((data) => {
        //console.log('data', data);
        resolve(data);
      })
      .catch((error) => {
        console.log('error', error);
        reject(error);
      });
  });
};

const login = (
  email: string,
  password: string,
) => {
  // json object to create user
  const user = {
    email: email,
    password: password,
  };

  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  };

  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/user/login', options)
      .then((res) => res.json())
      .then((data) => {
        //console.log('data', data);
        resolve(data);
      })
      .catch((error) => {
        console.log('error', error);
        reject(error);
      });
  });
};

export {
  register,
  login,
};