import { memo } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';

const DashboardLayout = ({children , activeMenu}) => {
  return (
   <div>
    <NavBar activeMenu = {activeMenu}/>
    <div className="flex">
      <div className="max-[1080px]:hidden">
      <SideBar activeMenu = {activeMenu}/>
      </div>
      <div className="grow mx-5">
      {children}
      </div>
    </div>
   </div>
  );
};

export default DashboardLayout;