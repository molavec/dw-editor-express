import pg from 'pg';
const { Pool } = pg;

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

  end() {
    this.pool.end();
  }

}

export default DatabaseManager;