import Head from 'next/head';

import { LoginForm } from '../components/LoginForm';

export default function Login() {
  return (
    <>
      <Head>
        <title>Faça login com seu github</title>
      </Head>
      <LoginForm />
    </>
  );
}
