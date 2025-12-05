import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useAuth} from '../hooks.jsx';
import {useNavigate} from 'react-router';

const Login = () => {
  const {login} = useAuth();
  let nav = useNavigate();
  
  const [usrname , setUsrname] = useState();
  const [pwd , setPwd] = useState();

  const handleForm = (e) =>{
    e.preventDefault();
    if(login(usrname , pwd)) nav('/' , {replace: true});

  }

  return(
    <main className='flex size-full min-w-full min-h-screen items-center justify-center'>
      <div className='min-w-[25vw] bg-blue-500/40 rounded-sm p-5 flex flex-col gap-5'>
        <h1 className='self-center text-4xl'>Login</h1>
        <form className='flex flex-col gap-5' onSubmit={handleForm}>
          <TextField
            required
            onChange = {(e) => setUsrname(e.target.value)}
            id="outlined-required"
            label="Логин"
          />
          <TextField
            required
            id="outlined-password-input"
            onChange = {(e) => setPwd(e.target.value)}
            label="Пароль"
            type="password"
            autoComplete="current-password"
          />
          <Button variant="contained" type='submit'>Войти</Button>
        </form>
      </div>
    </main>
  )
}

export default Login;
