import { Stack } from "@mui/material"
import StatCard from "./StatCard"
import CheckIcon from "@mui/icons-material/Check";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import WarningIcon from "@mui/icons-material/Warning";
import ClockIcon from "@mui/icons-material/AccessTime";
import useTasks from "../hooks/useTasks";
export default function StatHeader() {
  const {counts} = useTasks()
  const total = counts.allCount
   const urgent =
    counts.personal.urgent +
    counts.finance.urgent +
    counts.health.urgent +
    counts.other.urgent +
    counts.work.urgent +
    counts.social.urgent +
    counts.learning.urgent;
  return (
    <Stack direction='row' spacing={2} sx={{flexWrap:'wrap',mb:5,gap:2}}>
      <StatCard title="Completed" value={counts.completedCount}  total={counts.completedCount} icon={CheckIcon}   color="success" subtitle="Across all categories" />
  <StatCard title="Total"     value={counts.allCount} total={total} icon={ListIcon}    color="info"    subtitle="Across all categories" />
  <StatCard title="High Priority"   value={urgent}   total={urgent} icon={WarningIcon} color="error"   subtitle="Needs attention" />
  <StatCard title="Pending"   value={counts.allCount - counts.completedCount}  total={counts.allCount - counts.completedCount} icon={ClockIcon}   color="warning" subtitle="Pending" />
    </Stack>
  )
}
