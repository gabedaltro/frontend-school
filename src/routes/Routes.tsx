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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<RouteApp element={<Error404 />} />} />

      <Route path="/" element={<RouteApp element={<Home />} />} />

      <Route path="/classroom" element={<RouteApp element={<Classroom />} />} />
      <Route
        path="/classroom/new"
        element={<RouteApp element={<ClassroomNew />} />}
      />

      <Route
        path="/report-card"
        element={<RouteApp element={<ReportCard />} />}
      />
      <Route
        path="/report-card/new"
        element={<RouteApp element={<ReportCard />} />}
      />

      <Route
        path="/teachers"
        element={<RouteApp element={<TeacherPage />} />}
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
        path="/student/new"
        element={<RouteApp element={<StudentNew />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
