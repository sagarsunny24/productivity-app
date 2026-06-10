import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import TodayIcon from "@mui/icons-material/Today";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
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

export default function PersistentDrawerLeft({
  children,
}: React.PropsWithChildren) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
        <Toolbar>
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
            Pro App
          </Typography>
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
          <ListItem key={"upcoming"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <UpcomingIcon />
              </ListItemIcon>
              <ListItemText primary={"Upcoming"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"today"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary={"Today"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"completed"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DoneAllIcon />
              </ListItemIcon>
              <ListItemText primary={"Completed"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"calender"} disablePadding>
            <ListItemButton>
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
            <ListItemButton>
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
            <ListItemButton>
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
            <ListItemButton>
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
