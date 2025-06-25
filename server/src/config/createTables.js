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
  await db.query(`
		CREATE TABLE IF NOT EXISTS events(
			id INT AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(255) NOT NULL,
			description TEXT,
			ngo_id int NOT NULL,
			start_time TIMESTAMP NOT NULL,
			end_time TIMESTAMP,
			location VARCHAR(50),
			city VARCHAR(30),
			state VARCHAR(30),
			country VARCHAR(30),
			locationLink VARCHAR(255),
			status VARCHAR(10) DEFAULT 'upcoming',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (ngo_id) REFERENCES ngos(id) ON DELETE CASCADE ON UPDATE CASCADE
		);	
	`);
};
