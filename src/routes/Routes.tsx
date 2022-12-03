import RouteApp from "./Route";
import Home from "../pages/home/Home";
import { Route, Routes } from "react-router-dom";
import StudentPage from "../pages/student/Student";
import Error404 from "../components/error/Error404";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<RouteApp element={<Error404 />} />} />

      <Route path="/" element={<RouteApp element={<Home />} />} />
      <Route path="/class" element={<RouteApp element={<Home />} />} />
      <Route path="/report-card" element={<RouteApp element={<Home />} />} />
      <Route path="/teachers" element={<RouteApp element={<Home />} />} />
      <Route
        path="/students"
        element={<RouteApp element={<StudentPage />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
