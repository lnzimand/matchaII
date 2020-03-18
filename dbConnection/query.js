// query
export default async (connection, q, params) => new Promise(
    (resolve, reject) => {
      const handler = (error, result) => {
          if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
      connection.query(q, params, handler);
    });