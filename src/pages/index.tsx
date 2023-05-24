import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { AuthAction, withAuthUser, withAuthUserSSR } from "next-firebase-auth";

const raleway = Raleway({ subsets: ["latin"] });

export function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Naptic App - Chat with your data</title>
        <meta name="description" content="Naptic App - Chat with your data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/" className={styles.headerLogo}>
          <h1 className={raleway.className}>naptic</h1>
        </Link>
        <Link href="/login" className={styles.headerCTA}>
          Comenzar ahora
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.mainContent}>
          <h1>
            Transforma tus <span>audios en conocimiento</span>
          </h1>
          <p>
            Naptic usa el poder de la IA para analizar cualquier tipo de audio,
            generar resúmenes, identificar puntos clave, hacer minutas y mucho
            más...
          </p>
          <button>Comienza ahora</button>
        </div>
        <div className={styles.mainVideo}>
          <h2>Aprende a usar naptic</h2>
          <div className={styles.demoVideo}>
            <div>
              <Image src="/demo.png" alt="naptic demo" fill={true} />
            </div>
          </div>
        </div>
        <div className={styles.mainDemo}>
          <h2>¿Por qué mejor no lo pruebas?</h2>
          <div>
            <Image src="/demo.png" alt="naptic demo" fill={true} />
          </div>
        </div>
        <div className={styles.mainCases}>
          <h2>¿Quién usa naptic?</h2>
          <div className={styles.mainCasesList}>
            <div className={styles.case}>
              <h3>Ejecutivos</h3>
              <ul>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="record-voice-over"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <circle cx="9" cy="9" r="4"></circle>
                    <path d="M9 15c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4zm6.47-7.23c.32.79.32 1.67 0 2.46-.19.47-.11 1 .25 1.36l.03.03c.58.58 1.57.46 1.95-.27.76-1.45.76-3.15-.02-4.66-.38-.74-1.38-.88-1.97-.29l-.01.01c-.34.35-.42.89-.23 1.36zm3.71-4.88c-.4.4-.46 1.02-.13 1.48 1.97 2.74 1.96 6.41-.03 9.25-.32.45-.25 1.07.14 1.46l.03.03c.49.49 1.32.45 1.74-.1 2.75-3.54 2.76-8.37 0-12.02-.42-.55-1.26-.59-1.75-.1z"></path>
                  </svg>{" "}
                  Graba y analiza tus reuniones presenciales o en línea
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="pin"
                  >
                    <g data-name="Layer 2">
                      <g data-name="pin">
                        <rect width="24" height="24" opacity="0"></rect>
                        <path d="M12 2a8 8 0 0 0-8 7.92c0 5.48 7.05 11.58 7.35 11.84a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 9.92A8 8 0 0 0 12 2zm0 17.65c-1.67-1.59-6-6-6-9.73a6 6 0 0 1 12 0c0 3.7-4.33 8.14-6 9.73z"></path>
                        <path d="M12 6a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 6zm0 5a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 11z"></path>
                      </g>
                    </g>
                  </svg>
                  Identifica objetivos, asigna tareas y haz seguimiento con
                  Naptic
                </li>
                <li className={styles.fit}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="task"
                  >
                    <path d="M8 22h8c2.2 0 4-1.8 4-4V7c0-2-1.4-3.6-3.3-3.9-.4-.7-1.1-1.1-1.9-1.1H9.2c-.8 0-1.5.4-1.9 1.1C5.4 3.4 4 5 4 7v11c0 2.2 1.8 4 4 4zM9 4.1s.1-.1.2-.1h5.7l.1.1v.7c0 .1-.1.2-.2.2H9.2c-.1 0-.2-.1-.2-.2v-.7zM6 7c0-.8.4-1.4 1-1.8v.1c0 .1.1.2.1.3 0 0 0 .1.1.1 0 .1.1.2.1.2l.1.1c0 .1.1.1.2.2l.1.1.2.2.1.1c.1 0 .1.1.2.1 0 0 .1 0 .1.1.1 0 .2.1.3.1h.1c.2.1.3.1.5.1h6.2c.1 0 .2 0 .3-.1 0 0 .1 0 .1-.1.1 0 .1-.1.2-.1l.1-.1c.1 0 .1-.1.2-.2l.1-.1.2-.2.1-.1c0-.1.1-.1.1-.2 0 0 0-.1.1-.1 0-.1.1-.2.1-.3v-.1c.6.3 1 1 1 1.8v11c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V7z"></path>
                    <path d="M9 16h2c.6 0 1-.4 1-1s-.4-1-1-1H9c-.6 0-1 .4-1 1s.4 1 1 1zm0-4h6c.6 0 1-.4 1-1s-.4-1-1-1H9c-.6 0-1 .4-1 1s.4 1 1 1z"></path>
                  </svg>
                  Crea minutas en segundos
                </li>
              </ul>
            </div>
            <div className={styles.case}>
              <h3>Estudiantes</h3>
              <ul>
                <li className={styles.fit}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="class"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"></path>
                  </svg>
                  Transcribe clases y conferencias
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="question"
                  >
                    <g data-name="Layer 2">
                      <g data-name="menu-arrow-circle">
                        <rect opacity="0" transform="rotate(180 12 12)"></rect>
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                        <path d="M12 6a3.5 3.5 0 0 0-3.5 3.5 1 1 0 0 0 2 0A1.5 1.5 0 1 1 12 11a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.16A3.49 3.49 0 0 0 12 6z"></path>
                        <circle cx="12" cy="17" r="1"></circle>
                      </g>
                    </g>
                  </svg>
                  {
                    'Estudia en cualquier momento con ayuda de tu "profesor privado"'
                  }
                </li>
                <li className={styles.clock}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="clock"
                  >
                    <path d="M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20ZM12,6a.99974.99974,0,0,0-1,1v4.749L9.61816,14.32666a1.00029,1.00029,0,0,0,1.76368.94434l1.5-2.79883A1.00586,1.00586,0,0,0,13,12V7A.99974.99974,0,0,0,12,6Z"></path>
                  </svg>
                  Encuentra tu propio ritmo de aprendizaje
                </li>
              </ul>
            </div>
            <div className={styles.case}>
              <h3>Reporteros</h3>
              <ul>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="record-voice-over"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <circle cx="9" cy="9" r="4"></circle>
                    <path d="M9 15c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4zm6.47-7.23c.32.79.32 1.67 0 2.46-.19.47-.11 1 .25 1.36l.03.03c.58.58 1.57.46 1.95-.27.76-1.45.76-3.15-.02-4.66-.38-.74-1.38-.88-1.97-.29l-.01.01c-.34.35-.42.89-.23 1.36zm3.71-4.88c-.4.4-.46 1.02-.13 1.48 1.97 2.74 1.96 6.41-.03 9.25-.32.45-.25 1.07.14 1.46l.03.03c.49.49 1.32.45 1.74-.1 2.75-3.54 2.76-8.37 0-12.02-.42-.55-1.26-.59-1.75-.1z"></path>
                  </svg>{" "}
                  Transcribe entrevistas o reportajes en segundos
                </li>
                <li className={styles.clock}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    id="bulb"
                  >
                    <path d="M7.99806 2.00107C6.76915 2.00107 5.64713 2.48214 4.83044 3.31089C4.03189 4.12123 3.53982 5.24856 3.49914 6.54374L3.49854 6.56304L3.49942 6.58233C3.55611 7.81932 4.15415 8.90729 5.2364 10.0366L5.93751 12.9781L5.94478 12.9997C6.04506 13.2973 6.23732 13.5443 6.47926 13.7174C6.73012 13.8968 7.03709 13.9989 7.36154 13.9989L7.36295 13.9989L8.74641 13.995L8.76718 13.9932C9.08182 13.9661 9.37411 13.8428 9.60715 13.6476C9.83822 13.454 10.0129 13.1875 10.0875 12.8745L10.8834 9.82476C11.9173 8.83034 12.5012 7.6803 12.5012 6.38728C12.5012 5.17278 11.9938 4.07612 11.1819 3.28545C10.3652 2.49008 9.23825 2.00107 7.99806 2.00107ZM5.54271 4.0128C6.17059 3.37565 7.03566 3.00107 7.99806 3.00107C8.97163 3.00107 9.84989 3.38411 10.4842 4.00187C11.1144 4.6155 11.5012 5.45824 11.5012 6.38728C11.5012 7.37856 11.0482 8.31298 10.0966 9.19226L9.98904 9.2916L9.54309 11H6.49404L6.14509 9.53596L6.04777 9.4368C5.0014 8.37071 4.54729 7.48046 4.4993 6.55564C4.53672 5.50832 4.93324 4.63127 5.54271 4.0128ZM6.73239 12H9.28205L9.11822 12.6276L9.11523 12.6405C9.09344 12.734 9.04093 12.8174 8.96497 12.881C8.89244 12.9418 8.80038 12.983 8.69846 12.9952L7.36093 12.9989C7.24772 12.9988 7.14394 12.9633 7.06099 12.904C6.98586 12.8502 6.9299 12.7786 6.89869 12.6977L6.73239 12Z"></path>
                  </svg>
                  Obten ideas de títulos para tu nota
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="script"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 29 29"
                  >
                    <path
                      fill="none"
                      stroke="#9082cb"
                      stroke-miterlimit="10"
                      stroke-width="2"
                      d="M27 20.972H9M27 16.972H9M27 12.972H16M27 8.972H16"
                    ></path>
                    <circle cx="11.5" cy="11.528" r="2.5"></circle>
                    <circle cx="4.5" cy="11.528" r="2.5"></circle>
                    <path
                      fill="none"
                      stroke="#9082cb"
                      stroke-miterlimit="10"
                      d="M6 8.028a3.502 3.502 0 00-3.5 3.5M13 8.028a3.502 3.502 0 00-3.5 3.5"
                    ></path>
                  </svg>
                  Crea una nota a partir de tu entrevista o reportaje
                </li>
              </ul>
            </div>
            <div className={styles.case}>
              <h3>Profesionales de la salud</h3>
              <ul>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 101 101"
                    id="user"
                  >
                    <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
                  </svg>
                  Analiza las sesiones con tus pacientes en cualquier momento
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    id="security"
                  >
                    <path d="M532.2 984c33.8-21.5 67.7-42.9 101.5-64.4 15.3-9.7 30.8-19.3 45.7-29.7 35.4-24.7 68.6-52.8 98.1-84.4 58.4-62.7 102.8-137 130.9-217.9 22.9-66.1 32.7-135.8 32.7-205.6V248.9c0-17.9-12.5-33.5-29.4-38.6-12.2-3.7-24.3-7.5-36-12.4 3.2 1.3 6.4 2.7 9.6 4-20.9-8.9-40.5-20.3-58.5-34.1l8.1 6.3c-17.8-13.8-33.8-29.7-47.6-47.5l6.3 8.1c-13.8-18-25.3-37.7-34.2-58.6 1.3 3.2 2.7 6.4 4 9.6-3-7.2-5.8-14.6-8.2-22-5.4-16.9-20.5-29.4-38.6-29.4H357.7c-16.5 0-33.1-.5-49.6 0h-.7c-18.2 0-33.2 12.5-38.6 29.4-2.4 7.5-5.1 14.8-8.2 22 1.3-3.2 2.7-6.4 4-9.6-8.9 20.9-20.4 40.5-34.2 58.6l6.3-8.1c-13.8 17.8-29.8 33.7-47.6 47.5l8.1-6.3c-18 13.8-37.7 25.2-58.5 34.1 3.2-1.3 6.4-2.7 9.6-4-11.8 4.9-23.8 8.7-36 12.4-16.9 5.1-29.4 20.7-29.4 38.6v120.6c0 21.2 0 42.4 1.5 63.6 3.2 43.1 10.5 86.1 22.6 127.6 24 82.4 65.6 158.3 120.8 223.8 42.9 50.9 94.6 92.1 150.6 127.6l110.7 70.2c.9.6 1.9 1.2 2.8 1.8 17.7 11.2 44.9 4.3 54.7-14.4 10.4-19.8 4.5-42.7-14.4-54.7-18-11.4-36-22.8-53.9-34.2-23-14.6-45.9-29.1-68.9-43.7-16.1-10.2-31.8-21.1-47-32.7l8.1 6.3c-37.8-29.3-71.8-63.3-101.1-101.1l6.3 8.1c-29.8-38.7-54.6-81.1-73.7-126.1 1.3 3.2 2.7 6.4 4 9.6-19.5-46.3-32.8-94.9-39.5-144.7.5 3.5 1 7.1 1.4 10.6-4.3-32.4-5-64.8-5-97.3V249.3c-9.8 12.9-19.6 25.7-29.4 38.6 34.5-10.4 67.9-24.2 97.2-45.3 34.7-25 64.3-55.8 86.3-92.6 12.1-20.2 21.8-42.2 29-64.6-12.9 9.8-25.7 19.6-38.6 29.4H666.3c16.5 0 33.1.4 49.6 0h.7c-12.9-9.8-25.7-19.6-38.6-29.4 25.1 78.3 82.1 146.4 156.9 181.6 18 8.5 36.5 15.1 55.6 20.9-9.8-12.9-19.6-25.7-29.4-38.6v141.8c0 25.4-1.7 50.8-5 76 .5-3.5 1-7.1 1.4-10.6-6.8 49.7-20.1 98.4-39.5 144.7 1.3-3.2 2.7-6.4 4-9.6-19.1 45-43.9 87.4-73.7 126.1l6.3-8.1c-29.3 37.8-63.3 71.8-101.1 101.1l8.1-6.3c-22.4 17.3-46.2 32.2-70 47.4-26.4 16.8-52.8 33.5-79.2 50.3-6.8 4.3-13.7 8.7-20.5 13-8.7 5.5-15.6 13.8-18.4 23.9-2.6 9.6-1.4 22.3 4 30.8 11.4 17.6 35.8 26.2 54.7 14.2z"></path>
                    <path d="m308.2 509.9 102.7 102.7 14.6 14.6c15.3 15.3 41.3 15.3 56.6 0l79.3-79.3 125.5-125.5 28.9-28.9c14.8-14.8 15.9-42 0-56.6-16-14.7-40.8-15.8-56.6 0l-79.3 79.3-125.5 125.5-28.9 28.9h56.6L379.4 467.9l-14.6-14.6c-14.8-14.8-42-15.9-56.6 0-14.7 16-15.8 40.7 0 56.6z"></path>
                  </svg>
                  Ten la información de cada paciente paciente en un mismo lugar
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="question"
                  >
                    <g data-name="Layer 2">
                      <g data-name="menu-arrow-circle">
                        <rect opacity="0" transform="rotate(180 12 12)"></rect>
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                        <path d="M12 6a3.5 3.5 0 0 0-3.5 3.5 1 1 0 0 0 2 0A1.5 1.5 0 1 1 12 11a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.16A3.49 3.49 0 0 0 12 6z"></path>
                        <circle cx="12" cy="17" r="1"></circle>
                      </g>
                    </g>
                  </svg>
                  Pregúntale a naptic bot lo que necesites sobre tus pacientes
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.mainCTA}>
          <h2>Aunque tú también puedes</h2>
          <button>Comienza ahora</button>
        </div>
      </main>
      <footer className={styles.footer}>
        <div>
          <p>naptic</p>
          <p>{`© ${new Date().getFullYear()} naptic. All rights reserved.`}</p>
        </div>
      </footer>
    </div>
  );
}

export const getServerSideProps = withAuthUserSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Home);
