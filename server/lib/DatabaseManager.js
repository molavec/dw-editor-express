import pgk from 'pg';
const { Pool } = pgk;

const HOST = 'localhost';
const USER = 'root';
const PASSWORD = '123456';
const PORT = 5432;
const DATABASE = 'dw';

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class DatabaseManager {
  static instance;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {
    this.pool = new Pool({
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: PORT,
      database: DATABASE,
      idleTimeoutMillis: 5000,
      max: 20,
      connectionTimeoutMillis: 2000,
    });
    
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  static async getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
      const client = await DatabaseManager.instance.pool.connect();
      DatabaseManager.instance.setClient(client);
    }
    return DatabaseManager.instance;
  }

  setClient(client) {
    this.client = client;
  }

  connect() {
    this.pool.connect();
  }

  save(title, content) {

    return new Promise ((resolve, reject)=>{
      const queryText = `
        insert into text 
          (id, title, content) 
        values 
          (1, $1, $2)
        ON CONFLICT (id) DO UPDATE
        set 
        title = $1,
        content = $2
        returning *;
      `;

      const query = {
        // give the query a unique name
        name: 'save-text',
        text: queryText,
        values: [title, content],
      };
      
      this.client.query(query, (err, res) => {
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

  load(){
    const queryText = `
      select
        * 
      from 
        text 
      where 
        id=$1;
    `;
    const values = [1];

    const query = {
      // give the query a unique name
      name: 'get-text',
      text: queryText,
      values: values,
    };

    return new Promise ((resolve, reject)=>{
      this.client.query(query, (err, res) => {
        if (err) reject(err);
        //this.client.release();
        if(res){
          resolve(res.rows[0]);
        } else {
          reject('Error');
        }
      });
    });
  }

}

export default DatabaseManager;