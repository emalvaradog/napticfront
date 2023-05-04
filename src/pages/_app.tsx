import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Inter } from "next/font/google";
import initAuth from "@/firebase/config";

const inter = Inter({ subsets: ["latin"] });

initAuth();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
