import { Outlet } from "react-router-dom";
import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";
import MobileMenu from "../components/MobileMenu";
import { useSelector } from "react-redux";

function SiteLayout() {
  const {menu} = useSelector(store => store.menu)
  return (
    <>
      <PageHeader />
      {menu && 
      
      <MobileMenu />
      }
      <Outlet />
      <PageFooter/>
    </>
  );
}

export default SiteLayout;
