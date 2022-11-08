import {
  SvgIcon,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  CssBaseline,
  Typography,
  Drawer,
  AppBar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { sideMenuItems } from "../../constant/sideMenu";
import LogoutIcon from "@mui/icons-material/Logout";
import { ACESS_TOKEN } from "../../constant/token";
const drawerWidth = 240;

const DrawerContent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {sideMenuItems.map((item, index) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => navigate(item.link)}
          >
            <ListItemButton>
              <SvgIcon component={item.icon} sx={{ marginRight: "8px" }} />
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const MainLayout = (props) => {
  const { window, setisActive } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Attendance App
          </Typography>

          <IconButton
            children={<LogoutIcon />}
            style={{
              color: "#FFFFFF",
              position: "absolute",
              right: 16,
              top: 24,
              cursor: "pointer",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={() => {
              localStorage.removeItem(ACESS_TOKEN);
              setisActive(false);
            }}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerContent />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div style={{ marginTop: "32px" }}>
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

MainLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MainLayout;
