import React ,{useState}from "react";
import '../Styles/Dashboard.css';
import Chart from 'react-apexcharts';



const DashBoard = () => {
    const [selectedDates, setSelectedDates] = useState([]);

    

  const handleDateChange = (date) => {
    setSelectedDates([...selectedDates, date]); // Add the selected date to the array
  };

  const handleDeleteDate = (index) => {
    const updatedDates = [...selectedDates];
    updatedDates.splice(index, 1);
    setSelectedDates(updatedDates);
  };
  const [selectedmeeting, setSelectedmeeting] = useState(''); 

  const handlemeetingChange = (e) => {
    setSelectedmeeting(e.target.value);
  };

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    },
    series: [{
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 130, 145, 150]
    },
    {
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 130, 145, 150]
    }]
  });


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
        
                <div className="somme9"> <div className="st"><div className="somme3">Solde actuel </div></div>
                <div className="npr9">20000000</div>
                </div>
                
               
                
                <div className="somme9"> <div className="st"><div className="somme3">Total débit </div></div>
                <div className="npr9">20000000</div>
                </div>

                <div className="somme9"> <div className="st"><div className="somme3">Total crédit </div></div>
                <div className="npr9">20000000</div>
                </div>
    
               </div><div className="lessommes">
        
        <div className="somme8"> <div className="st"><div className="somme4">Demands </div></div>
        <div className="npr8">20000000</div>
        </div>
        
       
        
        <div className="somme8"> <div className="st"><div className="somme4">pret </div></div>
        <div className="npr8">20000000</div>
        </div>

        <div className="somme8"> <div className="st"><div className="somme4">offres </div></div>
        <div className="npr8">20000000</div>
        </div>

       </div>
               <div className="graphe9">
               <div className="graphtitle">Raport</div>
               <Chart options={chartOptions.options} series={chartOptions.series} type="line" height={310} />


               </div>
               
            </div>
            <div className="app88">
            <div className="chart-container">
        <Chart options={chartData.options} series={chartData.series} type="bar" width="400" className="my-chart" />
      </div>
    
            </div>
        </div>
    );
};

export default DashBoard;