import mysql from 'mysql';
import Logger from '../core/Logger';
import { db } from '../config';

const sql = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.name,
});
Logger.info('DBD connection done');
Logger.info(sql);

// If the Node process ends, close the MySQl connection
process.on('SIGINT', () => {
  Logger.info('DB Connection Close');
  process.exit(0);
});

export const executeQuery = (query: string): Promise<any | null> => {
  return new Promise((resolve, error) => {
    sql.query(query, (err, res) => {
      if (err) {
        error(err);
      }
      resolve(res);
    });
  });
};

export const insertRecord = (tableName: string, obj: any): Promise<any | null> => {
  return new Promise((resolve, error) => {
    sql.query(`INSERT INTO ${tableName} SET ?`, obj, (err, res) => {
      if (err) {
        error(err);
      }
      resolve({ id: res.insertId, ...obj });
    });
  });
};

export const updateRecord = (query: string, obj: string[]): Promise<any | null> => {
  return new Promise((resolve, error) => {
    sql.query(query, obj, (err, res) => {
      if (err) {
        error(err);
      }
      resolve(res);
    });
  });
};

export const connection = () => {
  return new Promise((resolve, reject) => {
    sql.getConnection((err, connection) => {
      if (err) reject(err);
      console.log('MySQL pool connected: threadId ' + connection.threadId);
      const query = (sql: any, binding: any) => {
        return new Promise((resolve, reject) => {
          connection.query(sql, binding, (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });
      };
      const release = () => {
        return new Promise((resolve, reject) => {
          if (err) reject(err);
          console.log('MySQL pool released: threadId ' + connection.threadId);
          resolve(connection.release());
        });
      };
      resolve({ query, release });
    });
  });
};

export const query = (sq: any, binding: any) => {
  return new Promise((resolve, reject) => {
    sql.query(sq, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export default { sql, connection, query };
