import DashboardNavbar from "@/components/DashboardNavbar";
import React from "react";
import Footer from "@/components/Footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
