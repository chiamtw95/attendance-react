import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddFace from "../views/AddFace";
import TakeAttendanceFace from "../views/TakeAttendanceFace";
import TakeAttendanceFace2 from "../views/TakeAttendanceFace2";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddFace />} />
        <Route path="/face" element={<TakeAttendanceFace2 />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
