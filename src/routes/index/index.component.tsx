import { Outlet } from "react-router-dom";
import { NavigationBar } from "../navigation/navigation.components";

export const Index = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
};
