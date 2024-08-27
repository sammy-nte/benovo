import React from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "../../components/Ngo-Components/PageHeader";
import SideMenu from "../../components/Ngo-Components/SideMenu";

function NgoPageLayout() {
  return (
    <div className="">
      <PageHeader />
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <SideMenu />
        <Outlet />
      </div>
    </div>
  );
}

export default NgoPageLayout;
