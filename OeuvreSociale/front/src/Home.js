import React from 'react'
import Dashboard from './Pages/Admin/Dashboard/Dashboard.jsx';
import home from './Pages/Employee/home/home.jsx';

const Home = () => {
  return (
    <div> 
    {role === "admin" && <Dashboard />}
    {role === "employee" && <home />}
    </div>
  )
}
export default Home;