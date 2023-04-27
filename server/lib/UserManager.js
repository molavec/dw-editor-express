import DatabaseManager from './DatabaseManager.js';
import bcrypt from 'bcrypt';

class UserManager  {
  
  constructor() {
    this.dbm = new DatabaseManager();
  }

  create(email, firstname, lastname, alias, image, password) {

    // hash password with bcrypt
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

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
        
        if (err) {
          console.log('error', err);
          reject(err);
        }
        
        resolve(res.rows[0]);
      });
      

    });
  }

  getById(id){
    const queryText = `
      select
        * 
      from 
        text 
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
      
      this.client.connect();

      this.client.query(query, (err, res) => {
        if (err) reject(err);

        if(res){
          resolve(res.rows[0]);
        } else {
          reject('Error');
        }
        
        this.client.end();

      });
    });
  }

  getByEmail(email){
    const queryText = `
      select
        * 
      from 
        text 
      where 
        email=$1;
    `;
    const values = [email];

    const query = {
      // give the query a unique name
      name: 'get-user-by-email',
      text: queryText,
      values: values,
    };

    return new Promise ((resolve, reject)=>{
      
      this.client.connect();

      this.client.query(query, (err, res) => {
        if (err) reject(err);

        if(res){
          resolve(res.rows[0]);
        } else {
          reject('Error');
        }
        
        this.client.end();

      });
    });
  }

}

export default UserManager;