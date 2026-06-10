import {
  Box,
  Checkbox,
  Card,
  Chip,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { pink } from '@mui/material/colors';
import { type TaskProps } from "../types";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";
export default function TaskItem({task}: TaskProps) {
  const navigate = useNavigate()
  function expiryDays(date_string: string): number {
    const [year, month, day] = date_string.split("-").map(Number);
    const expiry = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((expiry.getTime() - today.getTime()) / 8.64e7);
  }

  return (
    <Box sx={{m:1,p:1}}>
    <Card key={task.taskId} sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Category: {task.category.toUpperCase()}
        </Typography>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          Due in: {expiryDays(task.dueDate)} Days
        </Typography>

        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="overline">Description</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>{task.desc}</AccordionDetails>
        </Accordion>
        <Divider />
      </CardContent>
      <CardActions>
         <Checkbox
        //handleComplete  -onChange - 
        checked={task.completed}
        sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }}
      />
        <IconButton onClick={() => navigate(`/dashboard/edit`,{
          state:{task}
        })}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => onDelete(task.taskId)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
          <Chip
                  label={`Priority: ${task.priority}`}
                  sx={{width:150}}
                  color={
                    task.priority === "high"
                      ? "error"
                      : task.priority === "medium"
                        ? "warning"
                        : "success"
                  }
                />
      </CardActions>
    </Card>
    </Box>
  );
}
