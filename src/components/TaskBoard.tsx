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
import { pink } from "@mui/material/colors";
import type { TaskProps } from "../types";
import useTasks from "../hooks/useTasks";

const categoryColors: Record<string, string> = {
  personal:  'error.main',
  work:      'success.main',
  health:    'info.main',
  finance:   'warning.main',
  learning:  'secondary.main',
  social:    'primary.main',
  other:     'text.secondary',
};
const priorityColors = {
  low:    'success',
  medium: 'warning',
  high:   'error',
  urgent: 'secondary',
} as const;

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";
export default function TaskItem({ task }: TaskProps) {
  const { onDelete, onToggle } = useTasks();
  const navigate = useNavigate();
  function expiryDays(date_string: string): number {
    const [year, month, day] = date_string.split("-").map(Number);
    const expiry = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((expiry.getTime() - today.getTime()) / 8.64e7);
  }

  return (
    <Box sx={{ m: 1, p: 1 }}>
      <Card key={task.taskId} sx={{  maxWidth: 275,
       opacity:task.completed? 0.5 :1
       }}>
        <CardContent sx={{}}>
          <Typography
            gutterBottom
            sx={{ color: categoryColors[task.category], fontSize: 14 }}
          >
            {task.category.toUpperCase()}
          </Typography>
          <Typography variant="h5" component="div">
            {task.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Due in: {expiryDays(task.dueDate)} Days
          </Typography>

          <Accordion elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="overline">Description</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>{task.description}</AccordionDetails>
          </Accordion>
          <Divider />
        </CardContent>
        <CardActions sx={{ flexWrap: "wrap" }}>
          <Checkbox
            //handleComplete  -onChange -
            checked={task.completed}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
            onChange={() =>
              onToggle({ taskId: task.taskId, completed: !task.completed })
            }
          />
          <IconButton
            onClick={() =>
              navigate(`/dashboard/edit`, {
                state: { task },
              })
            }
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => onDelete({id: task.taskId})}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <Chip
            label={`Priority: ${task.priority}`}
            size="small"
            sx={{ fontSize: "0.7rem", height: 24 }}
            color={
              priorityColors[task.priority]
            }
          />
        </CardActions>
      </Card>
    </Box>
  );
}
