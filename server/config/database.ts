import { Pool } from "pg";
import "dotenv/config";
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

export async function initializeDatabaseUser():Promise<void> {
    const createUserTableQuery = `CREATE TABLE IF NOT EXISTS  UsersData (
      userId UUID PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      refreshToken VARCHAR(255)
       
  );`;

  try {
    await pool.query(createUserTableQuery);
    console.log("User Database table verified/created successfully.");
  } catch (err) {
    console.log("Error during intiialising User table", err);
  }
}
export async function initializeDatabaseTasks():Promise<void> {
  const createTaskTableQuery = `CREATE TABLE IF NOT EXISTS tasksdata (
    userId    UUID NOT NULL REFERENCES UsersData(userId),
    taskId    VARCHAR(255) PRIMARY KEY,
    title     VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    dueDate   DATE,
    priority  VARCHAR(10) DEFAULT 'medium'
              CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    category  VARCHAR(20) DEFAULT 'personal'
              CHECK (category IN ('personal', 'work', 'other', 'health', 'finance', 'learning', 'social')),
    completed BOOLEAN DEFAULT FALSE

);`;

  try {
    await pool.query(createTaskTableQuery);
    console.log("Task Database table verified/created successfully.");
  } catch (err) {
    console.log("Error during intiialising Task table", err);
  }
}

pool.on("connect", () => {
  console.log("New Client connected to Database");
});
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
// async function test() {
//   const client = await pool.connect()
// try {

// const result = await client.query('SELECT * FROM UsersData')
// console.log(result.rows)
// } catch (error) {

//   console.log(error)
// }
//   finally{
//     client.release()
//   }
// }
// test()
