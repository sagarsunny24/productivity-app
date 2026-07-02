import pool from "../config/database.js";
import type { Credential } from "../types/types.d.ts";
import type { LoginCredential } from "../types/types.d.ts";
export const validateUser = async (user: string) :Promise<LoginCredential | null> => {
  const result = await pool.query(
    "SELECT userId, password_hash,refreshtoken FROM usersdata WHERE username =$1",
    [user],
  );
  return result.rows[0] ?? null;
};
export const createNewUser  = async ({ userId, username, password} :Credential) :Promise<Credential | null> => {
  console.log(userId,username,password)
  const result = await pool.query(
    "INSERT INTO USERSDATA(userId,username,password_hash) VALUES ($1, $2,$3) RETURNING *",
    [userId, username, password],
  );
  console.log(result.rows)
  return result.rows[0] ?? null;
};

export const addRefreshToken = async({userId,refreshToken}:Pick<Credential,"userId"|"refreshToken">) =>{
  const result = await pool.query(
    "UPDATE USERSDATA SET refreshtoken=$1 where userid=$2",[refreshToken,userId]
  )

}

export const fetchRefreshToken = async(refreshToken:Pick<Credential,"refreshToken">)=>{
  const result = await pool.query(
    "SELECT * from usersdata where refreshtoken=$1",[refreshToken]
  );
  return result.rows[0] ?? null
}