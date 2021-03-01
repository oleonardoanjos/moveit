import '../styles/global.css';

interface LoginProps {
  
}

function MyApp({ Component, pageProps }, props: LoginProps) {  
  return(        
    <Component {...pageProps} />
  );
}

export default MyApp;
