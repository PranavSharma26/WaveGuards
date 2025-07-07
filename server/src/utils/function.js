export const createDatabase = async (connection) => {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  );
};

export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const getUser = async (email, db, table) => {
  const query = `SELECT * FROM ${table} WHERE email = ?`;
  const [rows] = await db.query(query, [email]);
  return rows.length > 0 ? rows[0] : null;
};

export const getUserFromId = async (id, db, table) => {
  const query = `SELECT * FROM ${table} WHERE id = ?`;
  const [rows] = await db.query(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const insertUser = async (
  name,
  email,
  phoneNumber,
  hashedPassword,
  verifyToken,
  db,
) => {
  const verifyTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const query = `INSERT INTO users (name,email,phoneNumber,password,verifyToken,verifyTokenExpiry) VALUES (?,?,?,?,?,?)`;
  await db.query(query, [
    name,
    email,
    phoneNumber,
    hashedPassword,
    verifyToken,
    verifyTokenExpiry,
  ]);
};

export const insertNGO = async (
  name,
  email,
  phoneNumber,
  hashedPassword,
  verifyToken,
  db,
) => {
  const verifyTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const query = `INSERT INTO ngos (name,email,phoneNumber,password,verifyToken,verifyTokenExpiry) VALUES (?,?,?,?,?,?)`;
  await db.query(query, [
    name,
    email,
    phoneNumber,
    hashedPassword,
    verifyToken,
    verifyTokenExpiry,
  ]);
};

export const updateTokenExpiry = async (email, newVerifyToken, db, table) => {
  const newExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const query = `UPDATE ${table} SET verifyToken = ? , verifyTokenExpiry = ? WHERE email = ?`;
  await db.query(query, [newVerifyToken, newExpiry, email]);
};

export const updateForgotPasswordTokenExpiry = async (
  email,
  newForgotPasswordToken,
  db,
  table,
) => {
  const newExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const query = `UPDATE ${table} SET forgotPasswordToken = ? , forgotPasswordTokenExpiry = ? WHERE email = ?`;
  await db.query(query, [newForgotPasswordToken, newExpiry, email]);
};

export const updateIsVerified = async (email, db, table) => {
  const query = `UPDATE ${table} SET isVerified = TRUE WHERE email = ?`;
  await db.query(query, [email]);
};

export const deleteUserFunction = async (id, db, table) => {
  const query = `DELETE FROM ${table} WHERE id = ?`;
  await db.query(query, [id]);
};

export const updatePassword = async (id, newPassword, db, table) => {
  const query = `UPDATE ${table} SET password = ? WHERE id = ?`;
  await db.query(query, [newPassword, id]);
};

export const updateBio = async (id, newBio, db, table) => {
  const query = `UPDATE ${table} SET bio = ? WHERE id = ?`;
  await db.query(query, [newBio, id]);
};

export const updateName = async (id, newName, db, table) => {
  const query = `UPDATE ${table} SET name = ? WHERE id = ?`;
  await db.query(query, [newName, id]);
};

export const updatePhoneNumber = async (id, newPhoneNumber, db, table) => {
  const query = `UPDATE ${table} SET phoneNumber = ? WHERE id = ?`;
  await db.query(query, [newPhoneNumber, id]);
};

export const updateUserAddress = async (
  id,
  city,
  state,
  country,
  db,
  table,
) => {
  const query = `UPDATE ${table} SET city = ?, state = ?, country = ? WHERE id = ?`;
  await db.query(query, [city, state, country, id]);
};

export const updateNGOAddress = async (
  id,
  address,
  city,
  state,
  country,
  db,
  table,
) => {
  const query = `UPDATE ${table} SET address = ?, city = ?, state = ?, country = ? WHERE id = ?`;
  await db.query(query, [address, city, state, country, id]);
};

export const isEventExist = async (title, ngo_id, db) => {
  const query = `SELECT * FROM events WHERE title = ? AND ngo_id = ? AND status = 'upcoming'`;
  const [rows] = await db.query(query, [title, ngo_id]);
  return rows.length > 0 ? true : false;
};

export const insertEvent = async (
  title,
  description,
  image,
  mimetype,
  start_time,
  end_time,
  location,
  city,
  state,
  country,
  locationLink,
  ngo_id,
  db,
) => {
  let query
  if(!end_time || end_time==="null"){
    query = `
    INSERT INTO events (title,description,image,mimetype,start_time,location,city,state,country,locationLink,ngo_id)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
  `;
    await db.query(query, [
      title,
      description,
      image,
      mimetype,
      start_time,
      location,
      city,
      state,
      country,
      locationLink,
      ngo_id,
    ]);
  }
  else {
    query = `
    INSERT INTO events (title,description,image,mimetype,start_time,end_time,location,city,state,country,locationLink,ngo_id)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
  `;
    await db.query(query, [
      title,
      description,
      image,
      mimetype,
      start_time,
      end_time,
      location,
      city,
      state,
      country,
      locationLink,
      ngo_id,
    ]);
  }
};

export const fetchUpcomingEvents = async (db) => {
  const current_time = new Date();
    await db.query(
    `UPDATE events SET status = 'upcoming' WHERE start_time > ?`,
    [current_time]
  );
  const [rows] = await db.query(
    `SELECT * FROM events WHERE status = 'upcoming' ORDER BY updatedAt DESC`
  );
  return rows.length > 0 ? rows : null;
};

export const fetchOngoingEvents = async (db) => {
  const current_time = new Date();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  await db.query(
    `UPDATE events 
     SET status = 'ongoing' 
     WHERE start_time < ? 
     AND (
       (end_time IS NOT NULL AND end_time > ?) 
       OR (end_time IS NULL AND start_time > ?)
     )`,
    [current_time, current_time, twoHoursAgo]
  );
  const [rows] = await db.query(
    `SELECT * FROM events WHERE status = 'ongoing' ORDER BY updatedAt DESC`
  );
  return rows.length > 0 ? rows : null;
};

export const fetchPastEvents = async (db) => {
  const current_time = new Date();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  await db.query(
    `UPDATE events 
     SET status = 'past' 
     WHERE 
       (end_time IS NOT NULL AND end_time < ?) 
       OR 
       (end_time IS NULL AND start_time < ?)`,
    [current_time, twoHoursAgo]
  );
  const [rows] = await db.query(
    `SELECT * FROM events WHERE status = 'past' ORDER BY updatedAt DESC`
  );
  return rows.length > 0 ? rows : null;
};

export const fetchNgoNameFromID = async (ngo_id,db) => {
  const query = `SELECT name FROM ngos WHERE id = ?`
  const [rows] = await db.query(query,[ngo_id])
  if(rows.length===0) return "-"
  return rows[0].name
}

export const updateEvent = async (
  title,
  description,
  start_time,
  end_time,
  location,
  city,
  state,
  country,
  locationLink,
  event_id,
  db,
) => {
  const query = `
    UPDATE events set title=?,description=?,start_time=?,end_time=?,location=?,city=?,state=?,country=?,locationLink=? WHERE id = ?`;
  await db.query(query, [
    title,
    description,
    start_time,
    end_time,
    location,
    city,
    state,
    country,
    locationLink,
    event_id
  ]);
};

export const deleteEvent = async (id,db) => {
  const query = `DELETE FROM events WHERE id = ?`
  await db.query(query,[id])
}

export const likeEvent = async (user_id, event_id, db) => {
  const query = `INSERT INTO likes(user_id, event_id) VALUES (?,?)`
  await db.query(query,[user_id, event_id])
}

export const unlikeEvent = async (user_id, event_id, db) => {
  const query = `DELETE FROM likes WHERE user_id = ? AND event_id = ?`
  await db.query(query,[user_id, event_id])
}

export const fetchTotalLikes = async (event_id, db) => {
  const query = `SELECT COUNT(*) AS totalLikes FROM likes WHERE event_id = ?`
  const [rows] = await db.query(query,[event_id])
  return rows.length > 0 ? rows[0].totalLikes : 0
}

export const rateEvent = async (user_id, event_id, rating, db) => {
  const query = `INSERT INTO ratings(user_id, event_id, rating) VALUES (?,?,?)`
  await db.query(query,[user_id, event_id, rating])
}

export const fetchRating = async (event_id, db) => {
  const query = `SELECT ROUND(AVG(rating),1) AS rating FROM ratings WHERE event_id = ?`
  const [rows] = await db.query(query,[event_id])
  return rows.length > 0 ? rows[0].rating : 0
}

export const isUserLiked = async (user_id, event_id, db) => {
  const query = `SELECT * FROM likes WHERE user_id = ? AND event_id = ?`
  const [rows] = await db.query(query,[user_id,event_id])
  return rows.length > 0 ? true : false
}

export const fetchImage = async (event_id, db) => {
  const query = `SELECT image, mimetype FROM events WHERE id = ?`
  const [rows] = await db.query(query,[event_id])
  if(rows.length==0){
    return null
  }
  return {
    image: rows[0].image,
    mimetype: rows[0].mimetype
  }
}

export const isRegistrationExist = async (user_id, event_id, db) =>{
  const query = `SELECT * FROM registrations WHERE user_id = ? AND event_id = ?`
  const [rows] = await db.query(query,[user_id, event_id])
  return rows.length > 0 ? true : false
}

export const insertRegistration = async (user_id, event_id, db) => {
  const query=`INSERT INTO registrations(user_id, event_id) VALUES(?,?)`
  await db.query(query,[user_id, event_id])
}

export const fetchNoOfVolunteers = async (event_id, db) => {
  const query = `SELECT COUNT(*) as count FROM registrations WHERE event_id = ?`;
  const [rows] = await db.query(query,[event_id])
  return rows.length > 0 ? rows[0].count : 0
}

export const deleteRegistration = async (user_id, event_id, db) => {
  const query = `DELETE FROM registrations WHERE user_id = ? AND event_id = ?`
  await db.query(query,[user_id, event_id])
}

export const fetchUserEvents = async (user_id, db) => {
  const query = `SELECT event_id FROM registrations WHERE user_id = ?`
  const [rows] = await db.query(query,[user_id]) 
  const eventIds = rows.map(row=>row.event_id)
  const placeholders = eventIds.map(()=>'?').join(',')
  if(eventIds.length === 0) return []
  const query2 = `SELECT * FROM events WHERE id in (${placeholders})`
  const [eventRows] = await db.query(query2,eventIds)
  return eventRows 
}
