import { AppProvider } from "@/data/context/AppContext";
import { LocalStorageProvider } from '@/data/context/LocalStorageContext'
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <LocalStorageProvider>
      <Component {...pageProps} />
    </LocalStorageProvider>
  );
}
