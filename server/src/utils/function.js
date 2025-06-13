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

export const insertUser = async (name,email,hashedPassword,verifyToken,db) => {
  const verifyTokenExpiry = new Date(Date.now() + 10*60*1000)
  const query = `INSERT INTO users (name,email,password,verifyToken,verifyTokenExpiry) VALUES (?,?,?,?,?)`
  await db.query(query,[name,email,hashedPassword,verifyToken,verifyTokenExpiry])
}

export const updateTokenExpiry = async (email,newVerifyToken,db,table) => {
  const newExpiry = new Date(Date.now() + 10*60*1000)
  const query = `UPDATE ${table} SET verifyToken = ? , verifyTokenExpiry = ? WHERE email = ?`
  await db.query(query,[newVerifyToken,newExpiry,email])
}

export const updateIsVerified = async (email,db,table) => {
  const query = `UPDATE ${table} SET isVerified = TRUE WHERE email = ?`
  await db.query(query,[email])
}