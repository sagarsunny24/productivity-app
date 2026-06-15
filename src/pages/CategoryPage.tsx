import useTasks from "../hooks/useTasks"
import TaskPage from "../components/TaskComponent"
import type { Task } from "../types"

export default function CategoryPage({category}:Pick<Task,"category">) {
  const {tasks} = useTasks()
  const categoryTasks = tasks?.filter((t)=>t.category === category)
  return (
    <TaskPage tasks={categoryTasks ?? []} show={true} heading={category} />
  )
}
