export const createDatabase = async (connection) => {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  );
};

export const getUser = async (email,db,table) => {
  const query=`SELECT * FROM ${table} WHERE email = ?`
  const [rows] = await db.query(query,[email]) 
  return rows.length> 0 ? rows[0] : null
}

export const insertUser = async (name,email,hashedPassword,db) => {
  const verifyTokenExpiry = new Date(Date.now() + 10*60*1000)
  const verifyToken = Math.floor(100000 + Math.random()*900000)
  const query = `INSERT INTO users (name,email,password,verifyToken,verifyTokenExpiry) VALUES (?,?,?,?,?)`
  await db.query(query,[name,email,hashedPassword,verifyToken,verifyTokenExpiry])
}

export const updateTokenExpiry = async (email,db,table) => {
  const newVerifyToken = Math.floor(100000 + Math.random()*900000)
  const newExpiry = new Date(Date.now() + 10*60*1000)
  const query = `UPDATE ${table} SET verifyToken = ? , verifyTokenExpiry = ?`
  await db.query(query,[newVerifyToken,newExpiry])
}