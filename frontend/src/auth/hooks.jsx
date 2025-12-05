import {createContext , useContext , useState , useEffect} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const[ user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const savedUser = localStorage.getItem('user');
    if(savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, [])

  const login = (usr , pwd) => {
    const fakeUser = {name: usr , role: 'guest'};
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    return true 
  }

  const logout = ()=> {
    setUser(null);
    localStorage.removeItem('user');
  }
  
  return (
    <AuthContext.Provider value ={{ user , login , logout  , loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

