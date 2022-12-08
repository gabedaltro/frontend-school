import RouteApp from "./Route";
import Home from "../pages/home/Home";
import { Route, Routes } from "react-router-dom";
import StudentPage from "../pages/student/Student";
import TeacherPage from "../pages/teacher/Teacher";
import Error404 from "../components/error/Error404";
import Classroom from "../pages/classroom/Classroom";
import ReportCard from "../pages/report-card/ReportCard";
import StudentNew from "../pages/student/registration/new/StudentNew";
import TeacherNew from "../pages/teacher/registration/new/TeacherNew";
import ClassroomNew from "../pages/classroom/registration/new/ClassroomNew";
import TeacherUpdate from "../pages/teacher/edit/TeacherUpdate";
import StudentUpdate from "../pages/student/edit/StudentUpdate";
import ClassroomUpdate from "../pages/classroom/edit/ClassroomUpdate";
import ReportCardNew from "../pages/report-card/registration/new/ReportCardNew";
import ReportCardUpdate from "../pages/report-card/edit/ReportCardUpdate";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<RouteApp element={<Error404 />} />} />

      <Route path="/" element={<RouteApp element={<Home />} />} />

      <Route path="/classroom" element={<RouteApp element={<Classroom />} />} />
      <Route
        path="/classroom/:id"
        element={<RouteApp element={<ClassroomUpdate />} />}
      />
      <Route
        path="/classroom/new"
        element={<RouteApp element={<ClassroomNew />} />}
      />

      <Route
        path="/report-card/:id"
        element={<RouteApp element={<ReportCardUpdate />} />}
      />
      <Route
        path="/report-card"
        element={<RouteApp element={<ReportCard />} />}
      />
      <Route
        path="/report-card/new"
        element={<RouteApp element={<ReportCardNew />} />}
      />

      <Route
        path="/teachers"
        element={<RouteApp element={<TeacherPage />} />}
      />
      <Route
        path="/teacher/:id"
        element={<RouteApp element={<TeacherUpdate />} />}
      />
      <Route
        path="/teacher/new"
        element={<RouteApp element={<TeacherNew />} />}
      />

      <Route
        path="/students"
        element={<RouteApp element={<StudentPage />} />}
      />
      <Route
        path="/student/:id"
        element={<RouteApp element={<StudentUpdate />} />}
      />
      <Route
        path="/student/new"
        element={<RouteApp element={<StudentNew />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
