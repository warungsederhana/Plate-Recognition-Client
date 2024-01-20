import DashboardNavbar from "@/components/DashboardNavbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbar />
      <div>{children}</div>
    </>
  );
};

export default DashboardLayout;
