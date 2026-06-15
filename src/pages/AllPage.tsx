import TaskPage from "../components/TaskComponent";
import useTasks from "../hooks/useTasks";
export default function AllPage() {
  const { tasks } = useTasks();
  return <TaskPage tasks={tasks ?? []} />;
}
