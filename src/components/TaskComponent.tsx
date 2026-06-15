import TaskItem from "./TaskBoard";

import useTasks from "../hooks/useTasks";
import EmptyTasks from "../pages/EmptyTasks";

import { Accordion, AccordionSummary, AccordionDetails, Box, Divider, Typography } from "@mui/material";
import { type Task ,type TaskPropsChildren} from "../types";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import TaskList from "./TaskList";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
// import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type ViewSetting = "board" | 'list'

export default function TaskPage({tasks,heading} :TaskPropsChildren) {
  const { fetchStatus } = useTasks();
  const [taskView, setTaskView] = useState<ViewSetting>('list')
  const handleChange = (_:React.MouseEvent, newView:ViewSetting ) => {
    if (newView !== null) setTaskView(newView)
  };
  // const [addBtn, setAddBtn] = useState<boolean>(false)
console.log(tasks)
  if (fetchStatus === "fetching") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="inherit" aria-label="Loading…" />
      </Box>
    );
  }
  return (
    // <TaskItem />
    <Box>
      <Accordion elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Box  sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 1,
      px: 1,
    }}>
      
        <Typography
      variant="overline"
        sx={{
          fontSize: "1rem",
          fontWeight: 600,
          letterSpacing: 1.5,
          color: "text.secondary",
          textTransform: "uppercase",
          lineHeight: 1,
          display: "block",
         
        }}>{heading??"Overview"}</Typography>
      
      </Box>
     
      <Divider textAlign="left">
       
 <ToggleButtonGroup
 size="small"
      color="primary"
      value={taskView}
      exclusive
      onChange={handleChange}
      aria-label="View"
    >
      <ToggleButton value="list"><ViewListIcon/></ToggleButton>
      <ToggleButton value="board"><GridViewIcon /></ToggleButton>
    </ToggleButtonGroup>
    
      </Divider>
       </AccordionSummary>
      {tasks.length ===0 ? (
        <EmptyTasks />
      ) : taskView==="board"? (
        <Box
          sx={{ display: "flex", m: 1, flexDirection: "row", flexWrap: "wrap" }}
        >
          {tasks.map((task: Task) => (
            <TaskItem key={task.taskId} task={task} />
          ))}
        </Box>
      ) : <TaskList tasks={tasks} />
      }
      
      </Accordion>
    </Box>
  );
}
