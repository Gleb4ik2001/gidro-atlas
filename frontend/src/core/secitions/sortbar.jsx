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

const demoRow = [
  {
    id: 1,
    Название: 'Капчагайское водохранилище',
    Область: 'Алматинская',
    'Тип ресурса': 'Водохранилище',
    'Тип воды': 'Пресная',
    'Наличие фауны': 'Да',
    'Дата паспорта': '2020-06-15',
    'Категория состояния': 3,
    'Приоритет обследования': 'Средний'
  },
  {
    id: 2,
    Название: 'Казахканал',
    Область: 'Карагандинская',
    'Тип ресурса': 'Канал',
    'Тип воды': 'Пресная',
    'Наличие фауны': 'Нет',
    'Дата паспорта': '2018-03-22',
    'Категория состояния': 2,
    'Приоритет обследования': 'Высокий'
  },
  {
    id: 3,
    Название: 'Большое озеро',
    Область: 'Актюбинская',
    'Тип ресурса': 'Озеро',
    'Тип воды': 'Непресная',
    'Наличие фауны': 'Да',
    'Дата паспорта': '2022-11-05',
    'Категория состояния': 1,
    'Приоритет обследования': 'Низкий'
  },
  {
    id: 4,
    Название: 'Гидроузел Астана',
    Область: 'Астанинская',
    'Тип ресурса': 'Сооружение',
    'Тип воды': 'Пресная',
    'Наличие фауны': 'Нет',
    'Дата паспорта': '2019-08-10',
    'Категория состояния': 4,
    'Приоритет обследования': 'Высокий'
  },
  {
    id: 5,
    Название: 'Костанайское озеро',
    Область: 'Костанайская',
    'Тип ресурса': 'Озеро',
    'Тип воды': 'Пресная',
    'Наличие фауны': 'Да',
    'Дата паспорта': '2021-02-18',
    'Категория состояния': 2,
    'Приоритет обследования': 'Средний'
  }
];
const Sortbar = ({setShowLakes}) => {
  const [open, setOpen] = useState(false);
  const {user , logout} = useAuth();


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
         <DataGrid  columns={demoColumn}
          rows={demoRow} />
      </div>}
    </div>
  );
};

export default Sortbar;

