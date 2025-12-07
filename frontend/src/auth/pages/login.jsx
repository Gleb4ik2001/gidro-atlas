import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useAuth} from '../hooks.jsx';
import {useNavigate} from 'react-router';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const Login = () => {
  const [msg , setMsg] = useState();
  const {login} = useAuth();
  let nav = useNavigate();
  
  const [usrname , setUsrname] = useState();
  const [pwd , setPwd] = useState();

  const handleForm = async (e) =>{
    e.preventDefault();
    const result = await login(usrname , pwd);
    if(result.state){
      setMsg({state: 'success' , detail:result.detail});
      setTimeout(() => {
        nav('/' , {replace: true});
      }, 2000);
    }
    else{
      setMsg({state: 'error' , detail:result.detail});
      setUsrname('');
      setPwd('');
    }
  }

  return(
    <main className='flex size-full min-w-full min-h-screen items-center justify-center'>
      {msg && <Alert variant="filled" severity={msg.state} sx={{position: 'absolute' , top:'5%',}}>
        {msg.detail}
      </Alert>}
      <div className='min-w-[20vw] bg-blue-500/40 rounded-sm py-8 px-5 flex flex-col gap-5'>
        <h1 className='self-center text-4xl'>Авторизация</h1>
        <form className='flex flex-col gap-5' onSubmit={handleForm}>
          <input
            required
            className='inputStyle'
            onChange = {(e) => setUsrname(e.target.value)}
            id="outlined-required"
            placeholder="Логин"
          />
          <input 
            required
            className='inputStyle'
            id="outlined-password-input"
            onChange = {(e) => setPwd(e.target.value)}
            placeholder="Пароль"
            type="password"
          />
          <Button variant="contained" type='submit' sx={{padding:'10px' , fontSize:'25px'}}>Войти</Button>
        </form>
      </div>
    </main>
  )
}

export default Login;
