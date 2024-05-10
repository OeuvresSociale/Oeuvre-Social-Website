import React ,{useState}from "react";
import '../Styles/Dashboard.css';
import Chart from 'react-apexcharts';



const DashBoard = () => {

    const chartOptions = {
        series: [{
            name: 'Demandes',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        },
        {
            name: 'Prets',
            data: [10, 45, 30, 55, 46, 68, 69, 100, 148]
        },
        {
            name: 'offres',
            data: [10, 42, 33, 45, 43, 60, 72, 95, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
            },
            markers: {
                size: 4
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 1,
                    opacityTo: 2,
                    
                }
            },
            colors: ['#4154f1', '#2eca6a', '#ff771d'],
            dataLabels: {
                enabled: false
            },
            stroke:{
                curve: 'smooth', 
                width:2,
            },
            
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            },
            
        },
    };

   
    
   

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
               <div className="graphe9">
               <div className="graphtitle">Reports</div>
               <Chart options={chartOptions.options} series={chartOptions.series} type="line" height={350} />


               </div>
               
            </div>
        </div>
    );
};

export default DashBoard;