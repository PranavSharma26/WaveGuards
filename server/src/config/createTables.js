export const createTables = async (db) => {
  await db.query(`
      CREATE TABLE IF NOT EXISTS users(
				id INT AUTO_INCREMENT PRIMARY KEY,
				name VARCHAR(30),
				email VARCHAR(50) UNIQUE,
				password VARCHAR(200),
				isVerified BOOL DEFAULT FALSE,
				verifyToken VARCHAR(200),
				verifyTokenExpiry TIMESTAMP,
				forgotPasswordToken VARCHAR(200),
				forgotPasswordTokenExpiry TIMESTAMP,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
  `);
};
