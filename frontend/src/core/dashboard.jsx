import { useState, useEffect } from "react";
import Sidebar from './secitions/sidebar.jsx';
import Sortbar from './secitions/sortbar.jsx';
import TerrainMap from './secitions/map.jsx';

const fake = [
  {
    name: 'Dos',
    region: 'Qaragandy',
    postion: [50.3, 68.2],
    category:1,
  },
 {
    name: 'Pos',
    region: 'Qaragandy',
    postion: [43.3, 76.9],
    category:2,
  },
 {
    name: 'Croos',
    region: 'Almaty',
    postion: [50.3, 68.2],
    category:3,
  },
 {
    name: 'Hos',
    region: 'Astana',
    postion: [51.2, 71.4],
    category:4,
  },
{
    name: 'Hos',
    region: 'Qostanay',
    postion: [53.2, 63.6],
    category:5,
  },
]

const Dashboard = () => {
  const [showLakes , setShowLakes] = useState(false);
  const [markers , setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(fake);
  }, []);
  return (
    <div className='grid grid-cols-[auto_1fr_auto] gap-5'>
      <Sidebar setShowLakes={setShowLakes}/>
      <TerrainMap showLakes={showLakes} markers={markers}/>
      <Sortbar/>
    </div>
  )
}

export default Dashboard;
