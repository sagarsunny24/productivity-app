import TaskPage from "../components/TaskComponent"
import useTasks from "../hooks/useTasks"
import { Box } from "@mui/material"
import {startOfWeek,endOfWeek,isWithinInterval,parseISO,addWeeks,startOfMonth,endOfMonth} from 'date-fns'
export default function UpcomingPage() {

  const {tasks} = useTasks()
  // const today = new Date()
  // const startOfWeek = new Date(today);
  // startOfWeek.setDate(today.getDate() - today.getDay())
  // startOfWeek.setHours(0,0,0,0)

  // const endOfWeek = new Date()
  // // console.log(today.getTime())



  const thisWeekTasks = tasks?.filter((t)=>{
    console.log(t.dueDate) // 2026-06-24
    return isWithinInterval(new Date(parseISO(t.dueDate)),{
      start:startOfWeek(new Date(),{weekStartsOn:1}),
      end: endOfWeek(new Date(), {weekStartsOn: 1})
    })
  })
  const nextWeek = addWeeks(new Date(), 1)
  const nextWeekTasks = tasks?.filter((t)=>{
    console.log(t.dueDate) // 2026-06-24
    return isWithinInterval(new Date(parseISO(t.dueDate)),{
      start:startOfWeek(nextWeek,{weekStartsOn:1}),
      end: endOfWeek(nextWeek, {weekStartsOn: 1})
    })
  })
  const thisMonthTasks = tasks?.filter((t)=>{
    console.log(t.dueDate) // 2026-06-24
    return isWithinInterval(new Date(parseISO(t.dueDate)),{
      start:startOfMonth(new Date()),
      end: endOfMonth(new Date())
    })
  })
  return (
    <>
    <Box sx={{display:'flex', gap:10, flexDirection:'column'}}>
   
    <TaskPage tasks={thisWeekTasks ?? []} heading="This Week" />

    <TaskPage tasks={nextWeekTasks ?? []} heading="Next Week" />
   
    <TaskPage tasks={thisMonthTasks ?? []} heading="Coming month" />
    </Box>
    </>
  )
}
