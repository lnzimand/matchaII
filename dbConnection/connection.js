// connect
import { createConnection } from 'mysql';


export default async (params) => new Promise(
(resolve, reject) => {
	const connection = createConnection(params);
  connection.connect(error => {
	  if (error) {
      reject(error);
      return;
    }
    resolve(connection);
  })
});