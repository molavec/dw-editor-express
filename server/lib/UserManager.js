import DatabaseManager from './DatabaseManager.js';

class UserManager  {
  
  constructor() {
    this.dbm = new DatabaseManager();
  }

  create(email, firstname, lastname, alias, image, hashedPassword) {


    //query build
    const queryText = `
      insert into dw_user 
        (
          email, 
          firstname,
          lastname,
          alias,
          image,
          password
        ) 
      values 
        ($1, $2, $3, $4, $5, $6)
      returning *;
    `;

    const query = {
      // give the query a unique name
      name: 'create-user',
      text: queryText,
      values: [email, firstname, lastname, alias, image, hashedPassword],
    };

    return new Promise ((resolve, reject) => {

      this.dbm.getPool().query(query, (err, res) => {
        if (err) reject(err);
        resolve(res.rows[0]);
      });

    });
  }

  update(id, email, firstname, lastname, alias) {

    //query build
    const queryText = `
      UPDATE dw_user
      SET 
        email = $2,
        firstname = $3,
        lastname = $4,
        alias = $5
      WHERE
        id=$1
      returning *;
    `;

    console.log('id', id);
    console.log('email', email);
    console.log('firstname', firstname);
    console.log('lastname', lastname);
    console.log('alias', alias);

    const query = {
      // give the query a unique name
      name: 'create-user',
      text: queryText,
      values: [id, email, firstname, lastname, alias],
    };

    return new Promise ((resolve, reject) => {

      this.dbm.getPool().query(query, (err, res) => {
        if (err) reject(err);
        
        console.log('res', res);
        
        resolve(res.rows[0]);
      });

    });
  }

  getById(id){
    const queryText = `
      select
        * 
      from 
        dw_user 
      where 
        id=$1;
    `;
    const values = [id];

    const query = {
      // give the query a unique name
      name: 'get-user-by-id',
      text: queryText,
      values: values,
    };

    return new Promise ((resolve, reject)=>{

      this.dbm.getPool().query(query, (err, res) => {
        if (err) reject(err);
        resolve(res.rows[0]);
      });
    });
  }

  async getByEmail(email){
    const queryText = `
      select
        * 
      from 
        dw_user
      where 
        email=$1
      returning *;
    `;
    const values = [email];

    const query = {
      // give the query a unique name
      name: 'get-user-by-email',
      text: queryText,
      values: values,
    }; 

    return new Promise ((resolve, reject)=>{

      this.dbm.getPool().query(query, (err, res) => {
        if (err) reject(err);
        // console.log('res.rows', res.rows);
        resolve(res.rows[0]);
      });
    });
  }

}

export default UserManager;