import React ,{ useState } from 'react';
import { FaRegListAlt} from "react-icons/fa";
import { FaUsers , FaMoneyBillTrendUp} from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import '../Styles/Sidebar.css'
import { MdOutlineSpaceDashboard , MdOutlineArchive , MdOutlineDashboard} from "react-icons/md";
import { TfiAnnouncement , TfiWrite, TfiAngleRight , TfiAngleLeft , TfiAngleDown} from "react-icons/tfi";
import { FaRegPlusSquare } from "react-icons/fa";
import { LuLayoutList } from "react-icons/lu";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { IoListCircleOutline } from "react-icons/io5";





import MenuItem from "./MenuItem.jsx";


function Sidebar({ children }) {
    const [isOpen, setIsOpen] = useState(true);
     // Get the root element

    const root = document.documentElement;
    const toggle = () => {
        setIsOpen(!isOpen);
       if(isOpen){
        root.style.setProperty('--dynamic-margin-left', '6%');
        root.style.setProperty('--dynamic-width', '94%');
        root.style.setProperty('--conwidth', '94%');
        root.style.setProperty('--dtwidth', '90%');
       

       }else {root.style.setProperty('--dynamic-margin-left', '18%');
       root.style.setProperty('--dynamic-width', '82%');
       root.style.setProperty('--conwidth', '82%');
       root.style.setProperty('--dtwidth', '79%');
       }
        
    }
    const menuItems = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <MdOutlineSpaceDashboard />
        },
        {
            path: "/employeelist",
            name: "Employé",
            icon: <FaUsers/>
        },
        {
            path: "/tables",
            name: "Tables",
            icon: <FaRegListAlt />
        }, {
            path: "/formulaire",
            name: "Formulaire",
            icon: <FaRegPlusSquare />
        },
        {
            path: "/tresorerie",
            name: "Trésorerie",
            icon: <FaMoneyBillTrendUp />,
            subicon :<TfiAngleDown/>,
            subicon2 :<TfiAngleRight/> ,
            subMenus: [
                {
                    path: "/dashboard",
                    name: "Dashboard",
                    icon: <MdOutlineDashboard />
                },
                {
                    path: "/transaction",
                    name: "Transaction",
                    icon: <HiOutlineSwitchVertical />
                },
                {
                    path: "/demandevalid",
                    name: "Demande valide",
                    icon: <IoListCircleOutline />
                }
            ]
        },
        {
            path: "/archive",
            name: "Archive",
            icon: <MdOutlineArchive />
        }
    ];
   


    return (
        <div className={isOpen ? "sidemenu" : "inactive"}>
            
                <div className='top-section'>
                    <div className={isOpen ? 'toggle-menu-btn' : 'toggle-menu-btn2'}>
                        {isOpen ? <TfiAngleLeft onClick={toggle} /> : <TfiAngleRight onClick={toggle} />}

                    </div>
                </div>
                <div className='mainmenu'>
                    <ul >
                        {menuItems.map((menuItem, index) => (
                            <MenuItem key={index} name={menuItem.name} path={menuItem.path} icon={menuItem.icon} subicon={menuItem.subicon} subicon2={menuItem.subicon2}  subMenus={menuItem.subMenus || []} />

                        ))}
                    </ul>
              



         </div>
            <main>{children}</main>
            
        </div>
    );
}

export default Sidebar;


