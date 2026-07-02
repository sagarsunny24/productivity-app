import pool from "../config/database.js";
import type { Task } from "../types/types.d.ts";
export const showTasks = async (userId : string) :Promise<Task[] | null> => {
  const result = await pool.query(
    `SELECT taskId AS "taskId",description,title,TO_CHAR(duedate,'YYYY-MM-DD') AS "dueDate",completed,priority,category FROM tasksData WHERE userid=$1 ORDER BY
    CASE priority
        WHEN 'urgent' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
        ELSE 5
    END,
    duedate ASC`,
    [userId],
  );
  // console.log(result)
  return result.rows ?? null;
};

export const addTask  = async ({
  userId,
  taskId,
  title,
  description,
  dueDate,
  priority,
  category,
  completed,
}: Task ) :Promise<Task |null> => {
  const result = await pool.query(
    "INSERT INTO TASKSDATA(userId,taskId,title,description,dueDate,priority,category,completed) VALUES ($1, $2, $3, $4, $5, $6,$7, $8) RETURNING *",
    [userId, taskId, title,description,dueDate, priority, category,completed,],
  );
  return result.rows[0] || null;
};

export const removeTask = async (userId :string, id : string) : Promise<Task | null> => {
  const result = await pool.query(
    "DELETE FROM TASKSDATA WHERE userid = $1 AND taskid = $2 RETURNING *",
    [userId, id],
  );
  return result.rows[0] ?? null;
};

export const updateTask = async ({
 userId,
  taskId,
  title,
  description,
  dueDate,
  priority,
  category,
  completed,
}: Task) : Promise<Task | null> => {
//   console.log({
//  userId,
//   taskId,
//   title,
//   description,
//   dueDate,
//   priority,
//   category,
//   completed,
// })
  const result = await pool.query(
    `UPDATE TASKSDATA 
       SET title=$1,
          description = $2,
          duedate=$3,
          priority=$4,
          category =$5,
          completed=$6
          WHERE userid= $7 AND taskId=$8 RETURNING *`,
    [title,description, dueDate, priority, category,completed, userId, taskId],
  );
  return result.rows[0] || null;
};

export const toggleTask = async (userId :string , id: string, status: boolean): Promise<Task | null> => {
  const result = await pool.query(
    `UPDATE TASKSDATA
      SET completed = $1
      WHERE userid = $2 AND taskId =$3 RETURNING *`,
    [status, userId, id],
  );
  return result.rows[0] ?? null;
};
