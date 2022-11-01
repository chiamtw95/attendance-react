import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export const sideMenuItems = [
  { text: "Dashboard", link: "/", icon: DashboardIcon },
  { text: "Mark Attendance", link: "/attendance", icon: FactCheckIcon },
  { text: "Attendance Report", link: "/reports", icon: AssessmentIcon },
  { text: "My Account", link: "/account", icon: SettingsIcon },
  { text: "Subjects", link: "/subjects", icon: MenuBookIcon },
];
