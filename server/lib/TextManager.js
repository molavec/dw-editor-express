import DatabaseManager from './DatabaseManager.js';

class TextManager {
  
  constructor() {
    this.dbm = new DatabaseManager();
  }


  create(title, content, userId) {

    return new Promise ((resolve, reject) => {

      const queryText = `
        insert into dw_text 
          (title, content, userId) 
        values 
          ($1, $2, $3)
        returning *;
      `;

      const query = {
        // give the query a unique name
        name: 'create-text',
        text: queryText,
        values: [title, content, userId],
      };

      this.dbm.getPool().query(query, (err, res) => {
        if (err) reject(err);

        // console.log('res', res);
        // this.client.release();
        if(res){
          resolve(res.rows[0]);
        } else {
          reject('Error');
        }

      });

    });
  }

  getById(id){
    const queryText = `
      select
        * 
      from 
        dw_text 
      where 
        id=$1;
    `;
    const values = [id];

    const query = {
      // give the query a unique name
      name: 'get-text-by-id',
      text: queryText,
      values: values,
    };

    return new Promise ((resolve, reject)=>{

      this.dbm.getPool().query(query, (err, res) => {
        if (err) reject(err);

        if(res){
          resolve(res.rows[0]);
        } else {
          reject('Error');
        }

      });
    });
  }

  getListByUserId(id){
    const queryText = `
      select
        * 
      from 
        dw_text 
      where 
        userId=$1;
    `;
    const values = [id];

    const query = {
      // give the query a unique name
      name: 'get-text-list-by-user-id',
      text: queryText,
      values: values,
    };

    return new Promise ((resolve, reject)=>{

      this.dbm.getPool().query(query, (err, res) => {
        if (err) reject(err);
        console.log('res.rows by user id', res.rows);
        resolve(res.rows);

      });
    });
  }

}

export default TextManager;