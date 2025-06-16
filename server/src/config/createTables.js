export const createTables = async (db) => {
  await db.query(`
      CREATE TABLE IF NOT EXISTS users(
				id INT AUTO_INCREMENT PRIMARY KEY,
				name VARCHAR(30),
				email VARCHAR(50) UNIQUE,
				phoneNumber VARCHAR(20),
				points INT DEFAULT 0,
				profilePicture VARCHAR(255),
				bio TEXT,
				totalWasteCollected FLOAT DEFAULT 0,
				city VARCHAR(50),
				state VARCHAR(50),
				country VARCHAR(50),
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
	await db.query(`
		CREATE TABLE IF NOT EXISTS ngos(
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(30),
			email VARCHAR(50) UNIQUE,
			phoneNumber VARCHAR(20),
			profilePicture VARCHAR(255),
			bio TEXT,
			totalWasteCollected FLOAT DEFAULT 0,
			address VARCHAR(50),
			city VARCHAR(50),
			state VARCHAR(50),
			country VARCHAR(50),
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
