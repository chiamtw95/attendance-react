import jwtDecode from "jwt-decode";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ACESS_TOKEN } from "../constant/token";
import MainLayout from "../layouts/mainLayout";
import Authentication from "../views/auth/Authentication";
import Dashboard from "../views/dashboard";
import ProfilePage from "../views/profile";
import AddFace from "../views/profile/AddFace";
import ChangePassword from "../views/profile/ChangePassword";
import AllSubjectLecturer from "../views/subjects/AllSubjectLecturer";
import AllSubjectsStudent from "../views/subjects/AllSubjectsStudent";
import CreateSubject from "../views/subjects/CreateSubject";
import SubjectDetails from "../views/subjects/SubjectDetails";
import SessionsList from "../views/takeAttendance/SessionsList";
import StudentCheckInPage from "../views/takeAttendance/StudentCheckInPage";
import SubjectList from "../views/takeAttendance/SubjectsList";
import TakeAttendance from "../views/takeAttendance/TakeAttendance";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuthVerify } from "./useAuthVerify";

const AttendanceRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <ProtectedRoute restrictedTo="ADMIN">
              <SubjectList />
            </ProtectedRoute>
            <ProtectedRoute restrictedTo="USER">
              <StudentCheckInPage />
            </ProtectedRoute>
          </>
        }
      />
      <Route
        path="/sessions/:id"
        element={
          <ProtectedRoute restrictedTo="ADMIN">
            <SessionsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/takeAttendance/:sessionId"
        element={
          <ProtectedRoute restrictedTo="ADMIN">
            <TakeAttendance />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const SubjectRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <ProtectedRoute restrictedTo="ADMIN">
              <AllSubjectLecturer />
            </ProtectedRoute>
            <ProtectedRoute restrictedTo="USER">
              <AllSubjectsStudent />
            </ProtectedRoute>
          </>
        }
      />
      <Route
        path="/:id"
        element={
          <ProtectedRoute restrictedTo="ADMIN">
            <SubjectDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute restrictedTo="ADMIN">
            <CreateSubject />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const AppRoutes = () => {
  const [isActive, setisActive] = useState(false);
  useAuthVerify();

  const checkToken = () => {
    const token = localStorage.getItem(ACESS_TOKEN);
    if (token && jwtDecode(token).exp * 1000 > Date.now()) return true;
    return false;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isActive || checkToken() ? (
              <MainLayout setisActive={setisActive} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance/*" element={<AttendanceRoutes />} />
          <Route path="subjects/*" element={<SubjectRoutes />} />
          <Route path="/reports" element={<></>} />
          <Route path="/account" element={<ProfilePage />} />
        </Route>

        <Route
          path="/login"
          element={<Authentication setisActive={setisActive} />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;

/* GENERAL (1/2)
  LOGIN => DONE
  REGISTER => TODO
*/

/* TODO LECTURER POV (0/3)
  SUBJECT ADMIN PAGE => IN PROGRESS
    CREATE SUB => DONE
    FETCH LECTURER SUBS => DONE 
    MANAGE SUBS => DONE
      ADD/REMOVE STUDENTS DONE
      CHANGE LECTURER (??)
  
  TAKE ATTENDANCE (2/3)
    FR PAGE  => DONE
    INDEX PAGE? PICK A SUB => SELECT MODE (code or fr), GET SESSION ID => DONE
    ICHECKIN CODE PAGE => TODO
 */

/* STUDENTS POV (1.5/4)
  CODE ICHECKINPAGE => TODO
  HIDE NAVBAR ITEMS => TODO
  ENROLLMENT PAGE => UI DONE, PENDING API INTEGRATION
  UPLOAD IMAGE => DONE (OPTIONAL: USE WEBCAM TO TAKE PICTURE)
 */

/*
  MANAGE SUBS => DONE
    ADD/REMOVE STUDENTS =>DONE
    DELETE SUBS, => DONE

  
    ENROLLMENT PAGE => UI DONE, PENDING API INTEGRATION (basically a query to connnect student to subjects db)

  [UI] INDEX PAGE? PICK A SUB => SELECT MODE (code or fr), GET SESSION ID => DONE-ish?
  
  ICHECKIN CODE PAGE => TODO
  ICHECKINCODE => page for students, lecturer, needs backend api


  */
