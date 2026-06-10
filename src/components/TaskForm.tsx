import {
  Avatar,
  Paper,
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router";
import { useState } from "react";
import useTasks from "../hooks/useTasks";
// import { type Task } from "../types";
import { toast,Bounce } from "react-toastify";
import { useLocation } from "react-router";
import type { Task } from "../types";

interface FormProps {
  edit: boolean;
  taskId?: string;
}
type Priority = 'high' | 'medium' | 'low'
type Category = 'personal' | 'work' | 'other'
export default function TaskForm({ edit }: FormProps) {
  const location = useLocation()
  const task = location.state?.task
  const {onAdd} = useTasks()
  const [title, setTitle] = useState<string>(task?.title ?? '')
  const [desc,setDesc] = useState<string | null>(task?.desc?? null)
  const [dueDate, setDate] = useState<string| null>(task?.date ?? null)
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'medium')
const [category, setCategory] = useState<Category>(task?.category ?? 'personal')

  const navigate = useNavigate();

  async function handleSubmit(){
    if(!edit){
      const newTask = {
        taskId: crypto.randomUUID(),
        title,
        desc,
        dueDate,
        priority,
        category,
        completed: false
      }
      try{
       await onAdd(newTask as Task)
       navigate('/dashboard')
      }
      catch(err){
      //toast error here
      toast.error(`Error ${err} occured`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
      }
      
    }
    else{
     try{
      const updatedTask = {...task,title,
        desc,
        dueDate,
        priority,
        category,}
       const res = await onEdit(updatedTask)
      navigate('/dashboard')
      }
      catch(err){
      //toast error here
      toast.error(`Error ${err} occured`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
      }
    }

  }
  return (
    <Paper elevation={0} sx={{ padding: 5,alignSelf:'center',width: "100%",
    maxWidth: 700,
    mx: "auto", }}>
      <Avatar
        sx={{
          mx: "auto",
          bgcolor: edit ? "warning.main" : "primary.main",
          textAlign: "center",
          mb: 1,
        }}
      >
        <AssignmentIcon />
      </Avatar>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {edit ? "Edit Task" : "Add new task"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          label="Title"
          placeholder="Debug code"
          fullWidth
          required
          autoFocus
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          sx={{ mb: 2 }}
        ></TextField>
        <TextField
          label="Description"
          placeholder="Eg: Add notes"
          fullWidth
          multiline
          rows={6}
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
          sx={{ mb: 2 }}
        ></TextField>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="priority-id">Priority</InputLabel>
            <Select
              fullWidth
              label="Priority"
              labelId="priority-id"
              value={priority}
              onChange={(e)=>setPriority(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="category-id">Category</InputLabel>
            <Select
              fullWidth
              label="Category"
              labelId="category_id"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Due Date"
            type="date"
            size="small"
            value={dueDate}
            onChange={(e)=>setDate(e.target.value)}
          />
          <Box sx={{display:'flex',gap:2}}>
            <Button sx={{alignSelf:'stretch'}} variant="outlined" onClick={()=> navigate('/dashboard/')}>Cancel</Button>

            <Button sx={{alignSelf:'stretch'}} type="submit" variant="contained">
              {edit ? "Save Changes" : "Add Task"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
