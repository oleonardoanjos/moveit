import { GetServerSideProps } from 'next';
import { LoginProvider } from '../contexts/LoginContext';
import '../styles/global.css';

interface LoginProps {
  logged: boolean;
  username: string;
  name: string;
  error: string;
}

function MyApp({ Component, pageProps }, props: LoginProps) {
  return(    
    <LoginProvider
      logged={props.logged}
      username={props.username}
      name={props.name}
      error={props.error}
    >
      <Component {...pageProps} />
    </LoginProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { logged, username, name, error } = ctx.req.cookies;

  return {
    props: {
      logged: Boolean(logged),
      username: String(username),
      name: String(name),
      error: String(error)
    }
  }
}

export default MyApp;
