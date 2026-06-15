import useTasks from "../hooks/useTasks"
import { Box } from "@mui/material"
import TaskPage from "../components/TaskComponent"
import { isToday,parseISO } from "date-fns"
export default function TodayPage() {
  const {tasks} = useTasks()

  const todayTasks = tasks?.filter((t)=>isToday(parseISO(t.dueDate)))
  return (
    <Box sx={{display:'flex', gap:10, flexDirection:'column'}}>
       
        <TaskPage tasks={todayTasks ?? [] } show={true} heading="Today" />
    </Box>
  )
}
