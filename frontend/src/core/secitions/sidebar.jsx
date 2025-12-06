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

const fakeData = [
  { name: 'regions', label: 'Выберите область', data: ['Qaragandy', 'Almaty', 'Balhash'] },
  { name: 'resource', label: 'Выберите тип водного ресурса', data: ['озеро', 'водохранилище', 'канал'] },
  { name: 'waterType', label: 'Выберите тип воды', data: ['пресная', 'непресная'] },
  { name: 'fauna', label: 'Выберите наличие фауны', data: ['да', 'нет'] },
  { name: 'passport', label: 'Выберите дату паспорта', data: ['2012-2014', '2014-2015', '2020-2025'] },
  { name: 'category', label: 'Выберите категорию состояния', data: ['Категория 1', 'Категория 2', 'Категория 3', 'Категория 4', 'Категория 5'] },
];

const Filters = ({filters , handleSelectChange , handleSubmit}) => {
  return(
    <>
      <h1 className='uppercase font-light text-2xl border-color'>Фильтрация</h1>
        {fakeData.map((data, j) => (
          <select
            key={j}
            className='p-2 rounded blue-color cursor-pointer w-full mb-2'
            name={data.name}
            value={filters[data.name] || ''}
            onChange={handleSelectChange}
          >
            <option value="">{data.label}</option>
            {data.data.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))}
          </select>
        ))}

        <Button variant='contained' color='primary' onClick={handleSubmit} className='mt-2 w-full'>
          Применить фильтры
        </Button>
    </>
  )
}

const Sidebar = ({ setShowLakes, onFilterSubmit, setShowCanals , setShowReserviors }) => {
  const [open, setOpen] = useState(true);
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

  const handleSubmit = () => {
    // Отправка фильтров наверх или на Django
    console.log('Submitted filters:', filters);
    if (onFilterSubmit) onFilterSubmit(filters);
    // Пример fetch на Django:
    // fetch('/api/objects/filter/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(filters)
    // }).then(res => res.json()).then(data => console.log(data));
  };

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

