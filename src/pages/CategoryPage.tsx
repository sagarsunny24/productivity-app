import useTasks from "../hooks/useTasks"
import TaskPage from "../components/TaskComponent"
import type { Task } from "../types"
import StatCard from "../components/StatCard"
import CheckIcon from "@mui/icons-material/Check";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import WarningIcon from "@mui/icons-material/Warning";
import ClockIcon from "@mui/icons-material/AccessTime";
import { Stack } from "@mui/material"
export default function CategoryPage({category}:Pick<Task,"category">) {
  const {tasks,counts} = useTasks()
  const categoryTasks = tasks?.filter((t)=>t.category === category)
  console.log(counts[category])
  return (
    <>
     <Stack direction='row' spacing={3} sx={{flexWrap:'wrap',mb:5}}>
       <StatCard title="Total" value={counts[category].count}  total={counts[category].count} icon={ListIcon}    color="info"    subtitle={`Across all tasks in category: ${category} `} />
        <StatCard title="Completed" value={counts[category].completed}  total={counts[category].count} icon={CheckIcon}   color="success" subtitle={` tasks completed in category: ${category}`} />
       
       <StatCard title="High Priority"   value={counts[category].urgent + counts[category].high}   total={counts[category].count} icon={WarningIcon} color="error"   subtitle="Needs attention" />
  <StatCard title="Pending"   value={counts[category].count - counts[category].completed}  total={counts[category].count} icon={ClockIcon}   color="warning" subtitle="Left to complete" />
      </Stack>
    <TaskPage tasks={categoryTasks ?? []} show={true} heading={category} />
    </>
  )
}
