import { useContext, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { LoginContext } from '../contexts/LoginContext';

import styles from '../styles/components/LoginForm.module.css';

export function LoginForm() {
  const [user, setUser] = useState('');
  const {handleLoginGithub, error } = useContext(LoginContext);
    
  return (
    <div className={styles.loginFormContainer}>
      <section>
        <div>
          <img src="/simbolo.svg" alt="Simbolo"/>
        </div>
        <div>
          <img src="/logo-full.svg" alt="Logo"/>
          <h1>Bem-vindo</h1>

          <div className={styles.description}>
            <img src="/github.svg" alt="Github"/>
            <p>Faça login com seu Github para começar</p>
          </div> 

          <form onSubmit={(e) => e.preventDefault()}>
            <input
              name="username"
              onChange={(e) => setUser(e.target.value)}
              placeholder="Digite seu username do GitHub"
              value={user}
            />
            <button
              type="submit"
              disabled={user.length === 0}
              onClick={() => handleLoginGithub(user)}
            >                     
              {error ? error : <AiOutlineArrowRight />}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}