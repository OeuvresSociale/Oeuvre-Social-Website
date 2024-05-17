import React, { useState } from "react";
import '../Styles/Sidebar.css';
import { NavLink } from 'react-router-dom';

let mstt=true;


const MenuItem =(props) => {
const { name , icon ,path, subicon,subicon2, subMenus } = props;
const [expand , setExpand]= useState(mstt);
const hide = () => setExpand(!expand);
mstt= expand;

const [activeItem, setActiveItem] = useState(null);

const handleItemClick = (index) => {
  setActiveItem(index);
};
return (
<li >
 
{path ? (
  <NavLink
    to={path}
    onClick={hide}
    className="menuitem"
    activeClassName='active'
  >
    <a className="menuitem">
      <div className="menuicon">
        {icon}
      </div>
    </a>
    <span className="link-text">{name}</span>
    <div className="subicon" style={{ backgroundColor: 'transparent' }}>
      {expand ? subicon2 : subicon}
    </div>
  </NavLink>
) : (
  <div onClick={hide} className="menuitem">
    {icon ? (
      <>
      <a className="menuitem">
          <div className="menuicon">{icon}</div>{" "}
        </a>{" "}
        <span className="link-text">{name}</span>{" "}
        <div className="subicon" style={{ backgroundColor: "transparent" }}>
          {expand ? subicon2 : subicon}
        </div>{" "}
      </>
    ) : (
      <>
        
        <span className="noicon">{name}</span>{" "}
       
      </>
    )}
  </div>
)}

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