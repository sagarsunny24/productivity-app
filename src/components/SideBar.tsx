import { type PropsWithChildren,useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import TodayIcon from "@mui/icons-material/Today";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  Box,
  Button,
  Chip,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
} from "@mui/material";
import SearchBar from "./SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate,Link } from "react-router";

const drawerWidth = 240;

interface MainProps {
  open?: boolean;
}
interface AppProps {
  open?: boolean;
}
const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<MainProps>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideBar({
  children,
}: PropsWithChildren) {
  const navigate = useNavigate()
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [selected,setSelected] = useState<'all' | 'upcoming' | 'today' |'completed' |'calendar' |'personal'| 'work' | 'other'>('all')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Productivity App
          </Typography>
           <Link to="/dashboard/add" state={{from: location.pathname}}>
        <Button  variant="contained"
        startIcon={<AddTaskIcon />}
        sx={{
          color:'primary.main',
          bgcolor:'secondary.main',
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          px: 2,
          py: 1,
          boxShadow: "none",
          "&:hover": {
            boxShadow: 2,
          },
        }}>
          <Typography variant="body2">Add new task</Typography>
        </Button>
      </Link>
        </Toolbar>
       
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Typography
          variant="overline"
          sx={{
            px: 2,
            display: "block",
            color: "text.secondary",
            fontSize: 20,
            letterSpacing: "0.1em",
          }}
        >
          Menu
        </Typography>
        <Divider />
        <SearchBar /> {/* Search bar component */}
        <Divider />
        <Typography
          variant="overline"
          sx={{
            px: 2,
            py: 1,
            display: "block",
            color: "text.secondary",
            fontFamily: "arial",
            fontSize: 15,
            letterSpacing: "0.1em",
          }}
        >
          TASKS
        </Typography>
        <List sx={{ marginTop: -3 }}>
          <ListItem key={"all"} disablePadding>
            <ListItemButton selected={selected === "all"}
    onClick={() => {
      setSelected("all");
       return navigate('/dashboard')
    }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary={"All Tasks"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"upcoming"} disablePadding>
            <ListItemButton selected={selected === "upcoming"}
    onClick={() => {
      setSelected("upcoming");
       return navigate('/dashboard/upcoming')
    }}>
              <ListItemIcon>
                <UpcomingIcon />
              </ListItemIcon>
              <ListItemText primary={"Upcoming"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"today"} disablePadding>
            <ListItemButton selected={selected === "today"}
    onClick={() => {
      setSelected("today");
       return navigate('/dashboard/today')
    }}>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary={"Today"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"completed"} disablePadding>
            <ListItemButton selected={selected === "completed"}
    onClick={() => {
      setSelected("completed");
       return navigate('/dashboard/completed')
    }}>
              <ListItemIcon>
                <DoneAllIcon />
              </ListItemIcon>
              <ListItemText primary={"Completed"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"calender"} disablePadding>
            <ListItemButton selected={selected === "calendar"}
    onClick={() => {
      setSelected("calendar");
       return navigate('/dashboard/calendar')
    }}>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary={"Calendar"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Typography
          variant="overline"
          sx={{
            px: 2,
            py: 1,
            display: "block",
            color: "text.secondary",
            fontFamily: "arial",
            fontSize: 15,
            letterSpacing: "0.1em",
          }}
        >
          Category
        </Typography>
        <List sx={{ marginTop: -3 }}>
          <ListItem key={"personal"} disablePadding>
            <ListItemButton selected={selected === "personal"}
    onClick={() => {
      setSelected("personal");
       return navigate('/dashboard/personal')
    }}>
              <Chip
                label="Personal"
                variant="outlined"
                sx={{
                  width: 120,
                  justifyContent: "flex-start",
                  fontWeight: 500,
                }}
                icon={
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "error.main",
                    }}
                  />
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"work"} disablePadding>
            <ListItemButton selected={selected === "work"}
    onClick={() => {
      setSelected("work");
       return navigate('/dashboard/work')
    }}>
              <Chip
                label="Work"
                variant="outlined"
                sx={{
                  width: 120,
                  justifyContent: "flex-start",
                  fontWeight: 500,
                }}
                icon={
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "success.main",
                    }}
                  />
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"other"} disablePadding>
            <ListItemButton selected={selected === "other"}
    onClick={() => {
      setSelected("all");
       return navigate('/dashboard/other')
    }}>
              <Chip
                label="Other"
                variant="outlined"
                sx={{
                  width: 120,
                  justifyContent: "flex-start",
                  fontWeight: 500,
                }}
                icon={
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "warning.main",
                    }}
                  />
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
