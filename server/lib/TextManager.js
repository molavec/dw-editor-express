import DatabaseManager from './DatabaseManager.js';

class TextManager extends DatabaseManager {
  
  constructor() {
    super();
  }


  save(id, title, content) {

    return new Promise ((resolve, reject) => {

      const queryText = `
        insert into text 
          (id, title, content) 
        values 
          ($1, $2, $3)
        ON CONFLICT (id) DO UPDATE
        set 
        id = $1,
        title = $2,
        content = $3
        returning *;
      `;

      const query = {
        // give the query a unique name
        name: 'save-text',
        text: queryText,
        values: [id, title, content],
      };
      
      this.client.connect();

      this.client.query(query, (err, res) => {
        if (err) reject(err);

        // console.log('res', res);
        // this.client.release();
        if(res){
          resolve(res.rows[0]);
        } else {
          reject('Error');
        }

        this.client.end();

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
      name: 'get-text-by-id',
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

export default TextManager;