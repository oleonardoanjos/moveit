import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import { LoginProvider } from '../contexts/LoginContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ButtonTheme } from '../components/ButtonTheme';
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { LoginForm } from "../components/LoginForm";
import { Profile } from "../components/Profile";

import stylesHome from '../styles/pages/Home.module.css';
import stylesLogin from '../styles/pages/Login.module.css';

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  themeName: string;
  logged: boolean;
  username: string;
  name: string;
  error: string;
}

export default function Home(props: HomeProps) {
  const logged = props.logged;

  return (
    <LoginProvider
      logged={props.logged}
      username={props.username}
      name={props.name}
      error={props.error}
    >
      {logged ? (
        <ChallengesProvider
          level={props.level}
          currentExperience={props.currentExperience}
          challengesCompleted={props.challengesCompleted}
        >
          <div className={stylesHome.homeContainer}>
            <Head>
              <title>Inicio | move.it</title>
            </Head>

            <ExperienceBar />
            
            <CountdownProvider>
              <section>
                <div>
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
          </div>
          <ThemeProvider
            themeName={props.themeName}
          >
            <ButtonTheme />
          </ThemeProvider>
        </ChallengesProvider>          
      ):(
        <div className={stylesLogin.loginContainer}>
          <Head>
            <title>Login | move.it</title>
          </Head>          
          <LoginForm />
        </div>
      )}        
    </LoginProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
          level,
          currentExperience,
          challengesCompleted,
          themeName,
          logged,
          username,
          name,
          error
        } = ctx.req.cookies;

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
      themeName: String(themeName ?? "light"),
      logged: Boolean(logged ?? false),
      username: String(username ?? ''),
      name: String(name ?? ''),
      error: String(error ?? '')
    }
  }
}
