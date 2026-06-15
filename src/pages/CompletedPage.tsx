import useTasks from "../hooks/useTasks"
import TaskPage from "../components/TaskComponent"


export default function CompletedPage() {
  const {tasks} = useTasks()
  const completedTasks = tasks?.filter((t)=>t.completed)
  return (
    <TaskPage tasks={completedTasks ?? []} heading="Completed" show={true}/>
  )
}
