import { useState } from "react";
import Sidebar from './secitions/sidebar.jsx';

const Dashboard = () => {
  return (
    <div className='grid grid-cols-[auto_1fr] gap-5'>
      <Sidebar />
      <div>Dsahboard</div>
    </div>
  )
}

export default Dashboard;
