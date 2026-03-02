import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../assets/assets";


const SideBar = ({ activeMenu }) => {
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-white border-r border-gray-200/5 p-5 stick z-20 top-[61px] h-[calc(100vh-61px)]">
      {SIDE_MENU_DATA.map((item, index) => (
        <button
        onClick={()=>navigate(item.path)}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all duration-200 ${activeMenu === item.label ? 'bg-[#3be477] text-white font-medium shadow-md hover:bg-[#3be477]' : 'hover:bg-gray-100'}`}
          key={`menu_${index}`}>
              <item.icon className="text-xl"/>
              {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideBar;