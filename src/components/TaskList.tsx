import {
  Checkbox,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useTasks from "../hooks/useTasks";
import type { TaskPropsChildren } from "../types";
import { useNavigate } from "react-router";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TaskList({ tasks} :TaskPropsChildren) {
  const navigate = useNavigate()
  const { onDelete, onToggle, } = useTasks();
  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 4, mx: "auto", maxWidth: "90%" }}
    >
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: "5%" }}> Done </StyledTableCell>
            <StyledTableCell sx={{ width: "40%" }}> Title</StyledTableCell>
             <StyledTableCell sx={{ width: "40%" }}> Description</StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }}> Priority</StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }}> Category</StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }}> Due Date</StyledTableCell>
            <StyledTableCell sx={{ width: "15%" }}> Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <StyledTableRow key={task.taskId}>
              <StyledTableCell component="th" scope="row">
                <Checkbox
                  checked={task.completed}
                  onChange={() =>
                    onToggle({ taskId: task.taskId, completed: !task.completed })
                  }
                />
              </StyledTableCell>

              <StyledTableCell
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "grey.500" : "inherit",
                }}
              >
                {task.title}
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "grey.500" : "inherit",
                }}
              >
                {task.description}
              </StyledTableCell>
              <StyledTableCell>
                <Chip
                  label={task.priority}
                  color={
                    task.priority === "high"
                      ? "error"
                      : task.priority === "medium"
                        ? "warning"
                        : "success"
                  }
                />
              </StyledTableCell>
                <StyledTableCell>
                <Chip
                variant="outlined"
                  label={task.category}
                  color={
                    task.category === "personal"
                      ? "error"
                      : task.category === "work"
                        ? "warning"
                        : "success"
                  }
                />
              </StyledTableCell>
              <StyledTableCell>{task.dueDate?task.dueDate: "--"}</StyledTableCell>
              <StyledTableCell>
                <IconButton onClick={() => navigate(`/dashboard/edit`, {
                state: { task },
              })}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => onDelete({id: task.taskId})}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
