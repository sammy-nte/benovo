import { Outlet } from "react-router-dom";
import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";

function SiteLayout() {
  return (
    <>
      <PageHeader />
      <Outlet />
      <PageFooter/>
    </>
  );
}

export default SiteLayout;
