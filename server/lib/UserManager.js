import DatabaseManager from './DatabaseManager.js';

class UserManager extends DatabaseManager {
  
  constructor() {
    super();
  }

  create(email, firstname, lastname, alias, image, password) {

    return new Promise ((resolve, reject) => {

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
        values: [email, firstname, lastname, alias, image, password],
      };
      

      this.client.query(query, (err, res) => {
        
        if (err) {
          console.log('error', err);
          reject(err);
        } 

        console.log('res', res);

        if(res){
          resolve(res.rows[0]);
        }
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