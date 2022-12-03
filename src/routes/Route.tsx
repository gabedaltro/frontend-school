import React, { ReactNode } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";

interface RouteAppProps {
  element: ReactNode;
}

const RouteApp: React.FC<RouteAppProps> = ({ element }) => {
  return <DefaultLayout>{element}</DefaultLayout>;
};

export default RouteApp;
