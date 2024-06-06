import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Dashboard.css';
import Chart from 'react-apexcharts';



const DashBoard = () => {
///link de cercle///////////////////////////////////////////////////////////////////////////////////
  const [chartData2, setChartData2] = useState({
    series: [],
    options: {
      labels: [],
      chart: {
        type: 'pie',
      },
      colors: ['#4154f1', '#2eca6a', '#ff771d', '#00aaff'],
    },
  });

  useEffect(() => {
    const fetchTransactionSummary = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/transaction-summary-by-type');
        const data = response.data;

        // Log the response data for debugging
        console.log('Transaction Summary Data:', data);

        // Filter out null or undefined values
        const validData = data.filter(item => item && item.type && item.percentage != null);

        const series = validData.map(item => item.percentage);
        const labels = validData.map(item => item.type);

        setChartData2(prevChartData => ({
          series: series,
          options: {
            ...prevChartData.options,
            labels: labels,
          },
        }));
      } catch (error) {
        console.error('Error fetching transaction summary:', error);
      }
    };

    fetchTransactionSummary();
  }, []);
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar',
        toolbar: {
          tools: {
            download: false // Disables the download icon
          }
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      colors: ['#4154f1', '#2eca6a'],
      plotOptions: {
        bar: {
         
          horizontal: false,
          columnWidth: '70%', // Adjust this value to create the desired gap
        },
      },
    },
    series: [{
      name: 'Encaissement',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 130, 145, 150]
    },
    {
      name: 'Décaissement',
      data: [25, 45, 15, 70, 49, 60, 70, 91, 125, 130, 145, 150]
    }]
  });


  //link of linechart//////////////////////////////////////////////////////////////////////////////////////
const [chartOptions, setchartOptions] = useState({

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
    });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/api/data');
            const newData = response.data; // Assuming your API returns the same structure as your initial state
            setChartData(newData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the fetchData function when the component mounts
      }, []);


      useEffect(() => {
        const fetchDatacircle = async () => {
          try {
            const response = await axios.get('/api/data');
            const newData = response.data; // Assuming your API returns the same structure as your initial state
            setChartData2(newData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDatacircle(); // Call the fetchData function when the component mounts
      }, []);


      useEffect(() => {
        const fetchDatagraph = async () => {
          try {
            const response = await axios.get('/api/data');
            const newData = response.data; // Assuming your API returns the same structure as your initial state
            setchartOptions(newData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDatagraph(); // Call the fetchData function when the component mounts
      }, []);


    const [soldeActuel, setSoldeActuel] = useState(null);

    useEffect(() => {
      const fetchSoldeActuel = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/currentAmount");
          setSoldeActuel(response.data.currentAmount); // Assurez-vous que la réponse contient le champ `amount`
        } catch (error) {
          console.error("Erreur lors de la récupération du solde actuel:", error);
        }
      };

      fetchSoldeActuel();
    }, [soldeActuel]);
  
    
 
    const [incomeSummary, setIncomeSummary] = useState({
      totalIncome: null,
      incomeCount: null,
      incomePercentage: null
    });

    useEffect(() => {
      const fetchIncomeSummary = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/income-summary");
          setIncomeSummary(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération du résumé des revenus:", error);
        }
      };

      fetchIncomeSummary();
    }, [incomeSummary]);
  
const [outcomeSummary, setOutcomeSummary] = useState({
    totalOutcome: null,
    outcomeCount: null,
    outcomePercentage: null
  });

  useEffect(() => {
    const fetchOutcomeSummary = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/outcome-summary");
        setOutcomeSummary(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du résumé des dépenses:", error);
      }
    };

    fetchOutcomeSummary();
  }, [outcomeSummary]);

    return (
        <div className="dashwrapp" >
            <div className="dashcol1">
                <div className="dashtitle">Dashboard</div>
                <div className="lessommes">
        
                <div className="somme9">
      <div className="st">
        <div className="somme3">Solde actuel</div>
      </div>
      <div className="npr9">{soldeActuel !== null ? soldeActuel : 'Loading...'}</div>
    </div>
                
               
                
                <div className="somme9"> <div className="st"><div className="somme3">Total débit </div></div>
                <div className="npr9">{outcomeSummary.totalOutcome !== null ? outcomeSummary.totalOutcome : 'Loading...'}</div>
                </div>

                <div className="somme9"> <div className="st"><div className="somme3">Total crédit </div></div>
                <div className="npr9">{incomeSummary.totalIncome !== null ? incomeSummary.totalIncome : 'Loading...'}</div>
                </div>
    
               </div><div className="lessommes">
        
        <div className="somme8"> <div className="st"><div className="somme4">Demands </div></div>
        <div className="npr8">20000000</div>
        </div>
        
       
        
        <div className="somme8"> <div className="st"><div className="somme4">pretes </div></div>
        <div className="npr8">20000000</div>
        </div>

        <div className="somme8"> <div className="st"><div className="somme4">offres </div></div>
        <div className="npr8">20000000</div>
        </div>

       </div>
               <div className="graphe9">
               <div className="graphtitle">Raport</div>
               <Chart  options={chartOptions.options}
          series={chartOptions.series}
          type="line" height={310} />


               </div>
               
            </div>
            <div className="app88">

           
            <div className="chart-container">
        <Chart options={chartData.options} series={chartData.series} type="bar" width="100%" className="my-chart" />
      </div>
      <div className="circle-chart">
             <Chart
         options={chartData2.options}
        series={chartData2.series}
        type="pie"
       height={250} />
        </div>
    
            </div>
        </div>
    );
};

export default DashBoard;