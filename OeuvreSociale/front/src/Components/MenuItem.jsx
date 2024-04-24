import React, { useState } from "react";
import { FaSackDollar , FaBoxArchive , FaUserGroup } from "react-icons/fa6";
import '../Styles/Sidebar.css'
import { NavLink } from 'react-router-dom';


const MenuItem =(props) => {
const { name , icon ,path, subicon,subicon2, subMenus } = props;
const [expand , setExpand]= useState(false);
const hide = () => setExpand(!expand);

const [activeItem, setActiveItem] = useState(null);

const handleItemClick = (index) => {
  setActiveItem(index);
};
return (
<li >
 
 <NavLink to={path} onClick={hide}  className="menuitem" activeclassname='active' >
 <a  className="menuitem">
    <div className="menuicon">
    {icon}
    
    </div> </a>
    <span className="link-taxt">{name}</span>
    <div className="subicon"  style={{ backgroundColor: 'transparent' }} >
    {expand ? subicon2 : subicon }
    </div>
    
    </NavLink>

 {subMenus && subMenus.length > 0 ? (
    <ul className={expand ?  "ai" : 'submenu'} >
        {subMenus.map((menu,index) =>(
            <NavLink to={menu.path}  >
            <li  key={index}   className={index === activeItem ? 'ayhaja active' : 'ayhaja'} onClick={() => handleItemClick(index)} >
               
                <a className="sicon" >{menu.icon}</a>
                <span className="subname" >{menu.name}</span>
              
            </li></NavLink>
        ))}
    </ul>
 ) : null }






</li>
);


};

export default MenuItem ;