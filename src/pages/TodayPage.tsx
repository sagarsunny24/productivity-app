import useTasks from "../hooks/useTasks"
import { Box } from "@mui/material"
import TaskPage from "../components/TaskComponent"
import { isToday,parseISO } from "date-fns"
import StatCard from "../components/StatCard"
import {Stack} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import WarningIcon from "@mui/icons-material/Warning";
import ClockIcon from "@mui/icons-material/AccessTime";
export default function TodayPage() {
  const {tasks,calculateCount} = useTasks()

  const todayTasks = tasks?.filter((t)=>isToday(parseISO(t.dueDate)))
  const counts = calculateCount(todayTasks)
  const urgent = counts.personal.urgent + counts.finance.urgent + counts.health.urgent + counts.other.urgent + counts.work.urgent + counts.social.urgent + counts.learning.urgent
  return (
    <>
    <Stack direction='row' spacing={3} sx={{flexWrap:'wrap',mb:10}}>
       <StatCard title="Total" value={counts.allCount}  total={counts.allCount} icon={ListIcon}    color="info"    subtitle='All Tasks today' />
        <StatCard title="Completed" value={counts.todayCompleted}  total={counts.todayCount} icon={CheckIcon}   color="success" subtitle={` Tasks completed today`} />
       
       <StatCard title="High Priority"   value={urgent}   total={counts.allCount} icon={WarningIcon} color="error"   subtitle="Needs attention" />
  <StatCard title="Pending"   value={counts.allCount- counts.completedCount}  total={counts.allCount} icon={ClockIcon}   color="warning" subtitle="Left to complete" />
      </Stack>
    <Box sx={{display:'flex', gap:10, flexDirection:'column'}}>
       
        <TaskPage tasks={todayTasks ?? [] } show={true} heading="Today" />
    </Box>
    </>
  )
}
