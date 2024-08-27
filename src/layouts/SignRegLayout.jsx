

import PageHeader from "../components/PageHeader";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import MobileMenu from '../components/MobileMenu';


function SignRegLayout() {
  const {menu} = useSelector(store => store.menu)

  return (
    <>
    {menu && 
      
      <MobileMenu />
      }
      <PageHeader />
      <Outlet />
    </>
  )
}

export default SignRegLayout