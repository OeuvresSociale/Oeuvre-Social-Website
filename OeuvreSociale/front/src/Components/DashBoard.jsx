import React ,{useState}from "react";
import '../Styles/Dashboard.css';



const DashBoard = () => {
   
    
   

    return (
        <div className="dashwrapp" >
            <div className="dashcol1">
                <div className="dashtitle">Dashboard</div>
                <div className="lessommes">
              
                <div className="somme9"> <div className="st"><div className="somme3">La somme totale </div><div className="aujour">Aujourd'hui</div></div>
                <div className="npr9">20000000</div>
                </div>
              

              
                <div className="somme9"> <div className="st"><div className="somme3">La somme entrante </div><div className="aujour">Aujourd'hui</div></div>
                <div className="npr9">20000000</div>
                </div>
                
               
                
                <div className="somme9"> <div className="st"><div className="somme3">La somme sortante </div><div className="aujour">Aujourd'hui</div></div>
                <div className="npr9">20000000</div>
                </div>
              
               
               </div>
               <div className="graphe9"></div>
               
            </div>
        </div>
    );
};

export default DashBoard;