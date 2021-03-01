import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../contexts/LoginContext';

export default function Index() {
  const { logged } = useContext(LoginContext)
  const router = useRouter();

  useEffect(() => {
    if (logged) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [logged]);

  return(<></>);
}
