import { ThemeProvider, Typography, createTheme } from "@mui/material";
import AppLayout from "./components/AppLayout";
import ProtectedLayout from "./pages/ProtectedLayout";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import TaskForm from "./components/TaskForm";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import AllPage from "./pages/AllPage";
import UpcomingPage from "./pages/UpcomingPage";
import TodayPage from "./pages/TodayPage";
import CompletedPage from "./pages/CompletedPage";
import CategoryPage from "./pages/CategoryPage";
import Calendar from "./pages/CalendarPage";
import ChartsPage from "./pages/ChartsPage";
// const theme = createTheme({
//   typography: {
//     fontFamily: "Roboto, Arial, sans-serif",
//   },
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#0d0d0d",
//       light: "#2c2c2c",
//     },

//     secondary: {
//       main: "#e0e0e0",
//       light: "#f5f5f5",
//     },
//     background: {
//       default: "#f5f5f5",
//       paper: "#ffffff",
//     },
//     text: {
//       primary: "#0d0d0d",
//       secondary: "#5a5a5a",
//     },
//     divider: "#e0e0e0",
//   },
// });
const theme = createTheme({

 

  palette: {
    mode: "light",

    primary: {
      main: "#6366F1", // Indigo
      light: "#818CF8",
      dark: "#4F46E5",
    },

    secondary: {
      main: "#f7f7f7", // Teal
      light: "#5EEAD4",
      dark: "#0F766E",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },

    divider: "#E2E8F0",
  },

 

});
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      {/* <SideBar/> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<AllPage />} />
            <Route path="/dashboard/upcoming" element={ <UpcomingPage />} />
            <Route path="/dashboard/today" element={<TodayPage />} />
            <Route path="/dashboard/completed" element={<CompletedPage/>} />
            <Route path="/dashboard/calendar" element={<Calendar />} />
             <Route path="/dashboard/personal" element={<CategoryPage category="personal"/>} />
             <Route path="/dashboard/work" element={<CategoryPage category="work"/>} />
             <Route path="/dashboard/health" element={<CategoryPage category="health"/>} />
             <Route path="/dashboard/finance" element={<CategoryPage category="finance"/>} />
             <Route path="/dashboard/social" element={<CategoryPage category="social"/>} />
             <Route path="/dashboard/learning" element={<CategoryPage category="learning"/>} />
             <Route path="/dashboard/other" element={<CategoryPage category="other"/>} />
             <Route path="/dashboard/charts" element ={<ChartsPage />} />
            <Route path="/dashboard/add" element={<TaskForm edit={false} />} />
            <Route path="/dashboard/edit" element={<TaskForm edit={true} />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<Typography>404 ERROR not found</Typography>}
        />
      </Routes>
    </ThemeProvider>
  );
}
