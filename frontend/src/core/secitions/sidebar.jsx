import { useState } from 'react';
import { useAuth} from '../../auth/hooks.jsx';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';


const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const {user , logout} = useAuth();

  return (
    <div
      className={`sidebar ${ open ? 'w-[250px]' : 'w-[50px]'}`}
    >
      <div className={`flex justify-between items-center h-16 border-b border-color ${open ? 'p-2' : 'p-1'}`}>
        {open ? <h1>Gidro Atlas</h1> : null}
        <button
          className='iconBtn'
          onClick={() => setOpen(!open)}>
          { open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon/>}
        </button>  
      </div>
      <div className='sidebar_body'>
      </div>
      <div className={`sidebar_footer ${open ? 'p-2' : 'p-1'} pt-5`}>
        {
          open ?
          <>
          <h1>AVA</h1>
          <h1>{user.name}</h1>
          </>: null
        }
        <button className='iconBtn' onClick={()=> logout()}><LogoutIcon /></button>
      </div>
    </div>
  );
};

export default Sidebar;

