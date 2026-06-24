import TaskPage from "../components/TaskComponent";
import { Stack } from "@mui/material";

import useTasks from "../hooks/useTasks";
import CheckIcon from "@mui/icons-material/Check";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import WarningIcon from "@mui/icons-material/Warning";
import ClockIcon from "@mui/icons-material/AccessTime";
import StatCard from "../components/StatCard";
export default function AllPage() {
  const { tasks, counts } = useTasks();
  const urgent =
    counts.personal.urgent +
    counts.finance.urgent +
    counts.health.urgent +
    counts.other.urgent +
    counts.work.urgent +
    counts.social.urgent +
    counts.learning.urgent;
  return (
    <>

      <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", mb: 10 }}>
        <StatCard
          title="Total"
          value={counts.allCount}
          total={counts.allCount}
          icon={ListIcon}
          color="info"
          subtitle="All Tasks"
        />
        <StatCard
          title="Completed"
          value={counts.completedCount}
          total={counts.todayCount}
          icon={CheckIcon}
          color="success"
          subtitle={` Tasks completed`}
        />

        <StatCard
          title="High Priority"
          value={urgent}
          total={counts.allCount}
          icon={WarningIcon}
          color="error"
          subtitle="Needs attention"
        />
        <StatCard
          title="Pending"
          value={counts.allCount - counts.completedCount}
          total={counts.allCount}
          icon={ClockIcon}
          color="warning"
          subtitle="Left to complete"
        />
      </Stack>
      <TaskPage tasks={tasks ?? []} show={true} />
    </>
  );
}
