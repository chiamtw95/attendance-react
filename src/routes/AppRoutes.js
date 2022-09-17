import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddFace from "../views/AddFace";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddFace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
