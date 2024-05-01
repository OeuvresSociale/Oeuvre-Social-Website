import React from 'react'
import Dashboard from './src/Pages/Admin/Dashboard/Dashboard';
import home from './src/Pages/Employee/home/home.jsx';

const Home = () => {
  return (
    <div> 
    {role === "admin" && <Dashboard />}
    {role === "employee" && <home />}
    </div>
  )
}
export default Home;