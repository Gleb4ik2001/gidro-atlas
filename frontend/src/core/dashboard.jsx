import { useState } from "react";
import Sidebar from './secitions/sidebar.jsx';
import TerrainMap from './secitions/map.jsx';

const Dashboard = () => {
  return (
    <div className='grid grid-cols-[auto_1fr] gap-5'>
      <Sidebar />
      <TerrainMap/>
    </div>
  )
}

export default Dashboard;
