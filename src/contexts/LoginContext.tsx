import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

interface LoginContextData {
  logged: boolean;
  username: string;
  name: string;
  error: string;
  handleLoginGithub: (user: string) => Promise<void>;
}

interface LoginProviderProps {
  children: ReactNode;
  logged: boolean;
  username: string;
  name: string;
  error: string;
}

export const LoginContext = createContext({} as LoginContextData);

export function LoginProvider({
  children,
  ...rest
}: LoginProviderProps) {
  const [logged, setLogged] = useState(rest.logged ?? false);
  const [username, setUsername] = useState(rest.username ?? '');
  const [name, setName] = useState(rest.name ?? '');
  const [error, setError] = useState(rest.error ?? '');

  const router = useRouter();

  useEffect(() => {
    console.log(username + ' teste');
    Cookies.set('logged', String(logged));
    Cookies.set('username', String(username));
    Cookies.set('name', String(name));
    Cookies.set('error', String(error));
  }, [logged, username, name, error]);

  async function handleLoginGithub(user: string) {
    if (user) {
      try {
        const res = await axios.get(`https://api.github.com/users/${user}`);        
        
        if (res.status === 200) {
          setError('');
          setUsername(user);
          setName(res.data.name ?? res.data.login);
          setLogged(true);
          router.push('/home');
        }
      } catch(error) {
        setError('Username invalido');
        setLogged(false);
      }    
    }
  }

  return (
    <LoginContext.Provider
      value={{                
        logged,
        username,
        name,
        error,
        handleLoginGithub
      }}>
      {children}
    </LoginContext.Provider>
  );
}
