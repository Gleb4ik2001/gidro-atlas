import React, { useState } from 'react';
import { useAuth } from '../../auth/hooks.jsx';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';
import Checkbox from '@mui/material/Checkbox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import {filters_data} from '../data/sidebar_data.jsx'
import AddForm from './addForm.jsx';
import axios from 'axios';

const Filters = ({filters , handleSelectChange , handleSubmit}) => {
  return(
    <>
      <h1 className='uppercase font-light text-2xl border-color'>Фильтрация</h1>
        {filters_data.map((data, j) => (
          <select
            key={j}
            className='p-2 rounded blue-color cursor-pointer w-full mb-2'
            name={data.name}
            value={filters[data.name] || ''}
            onChange={handleSelectChange}
          >
            <option value="">{data.label}</option>
            {data.data.map((item, i) => (
              <option key={i} value={item.value}>{item.label}</option>
            ))}
          </select>
        ))}

        <Button variant='contained' color='primary' onClick={handleSubmit} className='mt-2 w-full'>
          Применить фильтры
        </Button>
    </>
  )
}



const Sidebar = ({ setShowLakes, onFilterSubmit, setShowCanals , setShowReserviors , setMarkers }) => {
  const [open, setOpen] = useState(true);
  const [form , setForm] = useState(false);
  const [filters, setFilters] = useState({});
  const { user, logout } = useAuth();

  const handleCheckboxChange = (event , key) => {
    switch (key) {
      case 0:
        setShowLakes(prev => !prev);
        break;
      case 1:
        setShowCanals(prev => !prev);
        break;
      case 2:
        setShowReserviors(prev => !prev);
        break; 
      default:
        break;
    }  
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(filters);
      const token = localStorage.getItem("access");

      const res = await axios.get(
        "http://127.0.0.1:8000/api/main/objects/",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: filters,
        }
      );

      console.log(res.data);
      setMarkers(res.data);
    } catch (err) {
      console.error(err);
    }};

  return (
    <div className={`sidebar ${open ? 'w-[250px]' : 'w-[50px]'}`}>
      <div className={`flex justify-between items-center h-16 border-b border-color ${open ? 'p-2' : 'p-1'}`}>
        {open && <h1 className='text-2xl'>Gidro Atlas</h1>}
        <button className='iconBtn' onClick={() => setOpen(!open)}>
          {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
        </button>
      </div>

      <div className={`sidebar_body ${open ? 'p-2' : 'p-1'}`}>
        {['озёра , реки, пруды', 'каналы', 'водохранилища'].map((item, i) => (
          <div key={i} className='flex justify-between items-center'>
            {open ? <h1 className='capitalize text-lg'>{item}</h1> : ''}
            <Checkbox sx={{ color: 'white' }} onChange={(e) =>handleCheckboxChange(e, i)} icon={<VisibilityOffIcon />} checkedIcon={<VisibilityIcon />} />
          </div>
        ))}

        <span className='divider mb-5'></span>

        {user.role === 'expert' && open ? <Filters filters={filters} handleSelectChange={handleSelectChange} handleSubmit={handleSubmit} /> : ''}

        <span className='divider mb-5'></span>
        {user.role === 'expert' ?
          <Button variant='contained' color='secondary' onClick={()=> setForm(true)} className='mt-2 w-full'>
            Добавить точку
          </Button>: ''}

        {form ? <AddForm setForm={setForm}/> : ''}

      </div>

      <div className={`sidebar_footer ${open ? 'p-2' : 'p-1'}`}>
        {open && (
          <>
            <h1>AVA</h1>
            <div className='flex flex-col'>
              <h1 className='capitalize text-2xl'>{user.name}</h1>
              <h3 className='text-xl text-black/50 dark:text-white/50'>{user.role}</h3>
            </div>
          </>
        )}
        <button className='iconBtn' onClick={() => logout()}><LogoutIcon /></button>
      </div>
    </div>
  );
};

export default Sidebar;

