import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddFace from "../views/takeAttendance/AddFace";
import TakeAttendanceFace from "../views/takeAttendance/TakeAttendanceFace";
import CreateSubject from "../views/subjectsManage/CreateSubject";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddFace />} />
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
    CREATE SUB
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
