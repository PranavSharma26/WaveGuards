export const createDatabase = async (connection) => {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  );
};

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const getUser = async (email,db,table) => {
  const query=`SELECT * FROM ${table} WHERE email = ?`
  const [rows] = await db.query(query,[email]) 
  return rows.length> 0 ? rows[0] : null
}

export const getUserFromId = async (id,db,table) => {
  const query=`SELECT * FROM ${table} WHERE id = ?`
  const [rows] = await db.query(query,[id]) 
  return rows.length> 0 ? rows[0] : null
}

export const insertUser = async (name,email,phoneNumber,hashedPassword,verifyToken,db) => {
  const verifyTokenExpiry = new Date(Date.now() + 10*60*1000)
  const query = `INSERT INTO users (name,email,phoneNumber,password,verifyToken,verifyTokenExpiry) VALUES (?,?,?,?,?,?)`
  await db.query(query,[name,email,phoneNumber,hashedPassword,verifyToken,verifyTokenExpiry])
}

export const insertNGO = async (name,email,phoneNumber,hashedPassword,verifyToken,db) => {
  const verifyTokenExpiry = new Date(Date.now() + 10*60*1000)
  const query = `INSERT INTO ngos (name,email,phoneNumber,password,verifyToken,verifyTokenExpiry) VALUES (?,?,?,?,?,?)`
  await db.query(query,[name,email,phoneNumber,hashedPassword,verifyToken,verifyTokenExpiry])
}

export const updateTokenExpiry = async (email,newVerifyToken,db,table) => {
  const newExpiry = new Date(Date.now() + 10*60*1000)
  const query = `UPDATE ${table} SET verifyToken = ? , verifyTokenExpiry = ? WHERE email = ?`
  await db.query(query,[newVerifyToken,newExpiry,email])
}

export const updateForgotPasswordTokenExpiry = async (email,newForgotPasswordToken,db,table) => {
  const newExpiry = new Date(Date.now() + 10*60*1000)
  const query = `UPDATE ${table} SET forgotPasswordToken = ? , forgotPasswordTokenExpiry = ? WHERE email = ?`
  await db.query(query,[newForgotPasswordToken,newExpiry,email])
}

export const updateIsVerified = async (email,db,table) => {
  const query = `UPDATE ${table} SET isVerified = TRUE WHERE email = ?`
  await db.query(query,[email])
}

export const deleteUserFunction = async (id,db,table) => {
  const query = `DELETE FROM ${table} WHERE id = ?`
  await db.query(query,[id])
}

export const updatePassword = async (id,newPassword,db,table) => {
  const query = `UPDATE ${table} SET password = ? WHERE id = ?`
  await db.query(query,[newPassword,id])
}

export const updateBio = async (id,newBio,db,table) => {
  const query = `UPDATE ${table} SET bio = ? WHERE id = ?`
  await db.query(query,[newBio,id])
}

export const updateName = async (id,newName,db,table) => {
  const query = `UPDATE ${table} SET name = ? WHERE id = ?`
  await db.query(query,[newName,id])
}

export const updatePhoneNumber = async (id,newPhoneNumber,db,table) => {
  const query = `UPDATE ${table} SET phoneNumber = ? WHERE id = ?`
  await db.query(query,[newPhoneNumber,id])
}

export const updateUserAddress = async (id,city,state,country,db,table) => {
  const query = `UPDATE ${table} SET city = ?, state = ?, country = ? WHERE id = ?`
  await db.query(query,[city,state,country,id])
}

export const updateNGOAddress = async (id,address,city,state,country,db,table) => {
  const query = `UPDATE ${table} SET address = ?, city = ?, state = ?, country = ? WHERE id = ?`
  await db.query(query,[address,city,state,country,id])
}