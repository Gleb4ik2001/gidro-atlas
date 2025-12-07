import { useState, useEffect } from "react";
import Sidebar from './secitions/sidebar.jsx';
import Sortbar from './secitions/sortbar.jsx';
import TerrainMap from './secitions/map.jsx';
import {useAuth} from '../auth/hooks.jsx';
import axios from 'axios';
import {useNavigate} from 'react-router';

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
  let nav = useNavigate();
  const [showLakes , setShowLakes] = useState(false);
  const [showCanals , setShowCanals] = useState(false);
  const [showReserviors , setShowReserviors] = useState(false);
  const [markers , setMarkers] = useState([]);
  const{user , logout} = useAuth();

 useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access"); 
        const res = await axios.get("http://127.0.0.1:8000/api/main/objects", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        console.log(res.data);
        setMarkers(res.data);
      } catch (e) {
        nav('/login' , {replace: true});
      }
    };

    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-[auto_1fr_auto] gap-5'>
      <Sidebar setShowLakes={setShowLakes} setShowCanals={setShowCanals} setShowReserviors={setShowReserviors} setMarkers={setMarkers}/>
      <TerrainMap showLakes={showLakes} markers={markers} showReserviors={showReserviors} showCanals={showCanals}/>
      {user.role ==='expert' ? <Sortbar markers={markers} /> : ''}
    </div>
  )
}

export default Dashboard;
