import TaskItem from "../components/TaskItem"
import AddTaskIcon from '@mui/icons-material/AddTask';
import useTasks from "../hooks/useTasks"
import EmptyTasks from "./EmptyTasks";
import { Link } from "react-router";
import { Box,
  Button,
  Typography

 } from "@mui/material"
import { type Task } from "../types"
// import { useState } from "react";


export default function TaskPage() {
  const { tasks } = useTasks()
  // const [addBtn, setAddBtn] = useState<boolean>(false)

  return (
    // <TaskItem />
    <>
    <Link to="/dashboard/add">
<Button sx={{marginBottom:5}} variant="outlined" ><AddTaskIcon sx={{mr:1}} /><Typography variant="body2">Add new task</Typography></Button></Link>
{console.log(tasks)}
{!tasks? <EmptyTasks />:<Box sx={{display: 'flex',m: 1,flexDirection:'row',}}>
      
    {tasks.map((task : Task)=><TaskItem key={task.taskId} task={task}/>)}
    </Box>}
    
    </>
   
  )
}
