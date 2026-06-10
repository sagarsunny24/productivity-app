
import { Box,Typography } from '@mui/material'

export default function EmptyTasks() {
  return (
<Box
      component="section"
      sx={{
        p: 2,
        border: "1px dashed grey ",
        flexGrow: "1",
        textAlign: "center",
        mt: 4,
        mx: "auto",
        maxWidth: "90%",
      }}
    >
      <Typography variant="h4">No Tasks Yet</Typography>
      <Typography variant="h6">Click + Add Task to get started </Typography>
    </Box>
  )
}
