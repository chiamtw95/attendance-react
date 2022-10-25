import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddFace from "../views/takeAttendance/AddFace";
import TakeAttendanceFace from "../views/takeAttendance/TakeAttendanceFace";
import CreateSubject from "../views/subjectsManage/CreateSubject";
import MainLayout from "../layouts/mainLayout";
import { Navigate } from "react-router-dom";
import Authentication from "../views/auth/Authentication";
import Dashboard from "../views/dashboard";

const AppRoutes = (isActive) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Authentication />} />
          <Route
            path="/"
            element={isActive ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Route>

        <Route path="/addSubject" element={<AddFace />} />
        <Route path="/face" element={<TakeAttendanceFace />} />
        <Route path="/subject" element={<CreateSubject />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

/*GENERAL
LOGIN
REGISTER
*/

/* TODO LECTURER POV
  SUBJECT ADMIN PAGE
    CREATE SUB => 
    ADD STUDENTS
    REMOVE STUDENTS
  
  TAKE ATTENDANCE
    INDEX PAGE? PICK A SUB => method (code or fr)
    FR PAGE  => DONE
    ICHECKIN CODE PAGE => TODO
 */

/* STUDENTS
  UPLOAD IMAGE => DONE
  CODE ICHECKINPAGE
  GENERATE REPORT
 */
