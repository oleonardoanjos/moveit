import { useContext, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ButtonTheme } from '../components/ButtonTheme';
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import { LoginContext } from '../contexts/LoginContext';

import styles from '../styles/pages/Home.module.css';

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  themeName: string;
}

export default function Home(props: HomeProps) {
  const { logged } = useContext(LoginContext);

  const router = useRouter();

  useEffect(() => {
    if (!logged) {
      router.push('/login');
    }
  }, [logged]);

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
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
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted, themeName } = ctx.req.cookies;

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
      themeName: String(themeName ?? "light")
    }
  }
}
