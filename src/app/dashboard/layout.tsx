import DashboardNavbar from "@/components/DashboardNavbar";
import React from "react";
import Footer from "@/components/Footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
