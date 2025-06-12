import mysql from "mysql2/promise";
import { createDatabase } from "../utils/function.js";
import { createTables } from "./createTables.js";

let pool

const dbConnect = async () => {
	if(pool) return pool
	try {
    const tempConnection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD
		});
		console.log("Connection Established !!!")
		await createDatabase(tempConnection)
		await tempConnection.end()

		pool = mysql.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0
		})

		const connection = await pool.getConnection()
		await createTables(connection)
		connection.release()
		console.log("Tables Created")		
		return pool

  } catch (error) {
    console.log("Error Connecting to Database");
    process.exit(1);
  }
};

export default dbConnect