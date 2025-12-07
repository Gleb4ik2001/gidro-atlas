import { useState } from 'react';
import { useAuth} from '../../auth/hooks.jsx';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';
import { DataGrid } from '@mui/x-data-grid';

const demoColumn = [
  { field: 'Название' , width:150}, 
  { field: 'Область' , width:150 },
  { field: 'Тип ресурса' , width:150}, 
  { field: 'Тип воды' , width:150},  
  { field: 'Наличие фауны' , width:150}, 
  { field: 'Дата паспорта' , width:150},
  { field: 'Категория состояния' , width:250}, 
  { field: 'Приоритет обследования' , width:300}]


const Sortbar = ({setShowLakes , markers}) => {
  const [open, setOpen] = useState(false);
  const {user , logout} = useAuth();
  const technicalConditionText = {
    1: "Отличное",
    2: "Хорошее",
    3: "Удовлетворительное",
    4: "Плохое",
    5: "Критическое"
  };
  const demoRow = markers.map((item, index) => ({
    id: index + 1,
    Название: item.name,
    Область:  item.region,
    'Тип ресурса': item.resource_type === 'reservoir' ? 'Водохранилище' : item.resource_type,
    'Тип воды': item.water_type === 'fresh' ? 'Пресная' : 'Непресная',
    'Наличие фауны': item.fauna ? 'Да' : 'Нет',
    'Дата паспорта': item.passport_date,
    'Категория состояния': technicalConditionText[item.technical_condition],
    'Приоритет обследования': item.priority // можно преобразовать в текст, если нужно
  }));

  return (
    <div
      className={`sidebar ${ open ? 'w-[1500px]' : 'w-[50px]'}`}>
      <div className={`flex justify-between items-center h-16 border-b border-color ${open ? 'p-2' : 'p-1'}`}>
        <button
          className='iconBtn'
          onClick={() => setOpen(!open)}>
          { open ?  <KeyboardDoubleArrowRightIcon/> : <KeyboardDoubleArrowLeftIcon /> }
        </button>
        {open ? <h1 className='text-2xl'>Sort you list</h1> : null}
      </div>

      {open && <div className='sidebar_body  p-2'>
        <DataGrid
          columns={demoColumn}
          rows={demoRow}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>}
    </div>
  );
};

export default Sortbar;

