import { Outlet } from "react-router-dom";

// const useStyles = makeStyles()((theme) => ({
//   root: {
//     // backgroundColor: theme.palette.background.dark, //TO-DO: check if it is still valid
//     display: "flex",
//     height: "100%",
//     overflow: "hidden",
//     width: "100%",
//   },
//   content: {
//     flex: "1 1 auto",
//     height: "100%",
//     overflow: "auto",
//   },
// }));

// TO-DO: revisit to see if it is still needed
const MainLayout = () => {
  //   const { classes } = useStyles();

  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
