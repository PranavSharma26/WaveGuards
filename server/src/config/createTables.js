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
			image MEDIUMBLOB,
			mimetype VARCHAR(20),
			ngo_id int NOT NULL,
			start_time TIMESTAMP NOT NULL,
			end_time TIMESTAMP,
			location VARCHAR(50),
			city VARCHAR(30),
			state VARCHAR(30),
			country VARCHAR(30),
			locationLink VARCHAR(255),
			status VARCHAR(10) DEFAULT 'upcoming',
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (ngo_id) REFERENCES ngos(id) ON DELETE CASCADE ON UPDATE CASCADE
		);	
	`);
	await db.query(`
		CREATE TABLE IF NOT EXISTS likes(
			user_id INT NOT NULL,
			event_id INT NOT NULL,
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (user_id,event_id),
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
			FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
		)
	`);
	await db.query(`
		CREATE TABLE IF NOT EXISTS ratings(
			user_id INT NOT NULL,
			event_id INT NOT NULL,
			rating INT CHECK (rating >= 1 AND rating <= 5),
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (user_id,event_id),
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
			FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
		)
	`);
	await db.query(`
		CREATE TABLE IF NOT EXISTS registrations(
			event_id INT NOT NULL,
			user_id INT NOT NULL,
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (user_id,event_id),
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
			FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
		)
	`);
	await db.query(`
		CREATE TABLE IF NOT EXISTS equipments(
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(20) NOT NULL,
			event_id INT NOT NULL,
			quantity INT DEFAULT 0,
			requests INT DEFAULT 0,
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (event_id) REFERENCES events(id)
		)	
	`);
	await db.query(`
		CREATE TABLE IF NOT EXISTS equipment_allocations(
			user_id INT NOT NULL,
			equipment_id INT NOT NULL,
			PRIMARY KEY (user_id, equipment_id),
			FOREIGN KEY (user_id) REFERENCES users(id),
			FOREIGN KEY (equipment_id) REFERENCES equipments(id)
		)
	`);
};