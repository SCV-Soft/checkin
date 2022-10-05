import "styles/taiwindcss.css";
import "styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") import("mocks");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-center" pauseOnFocusLoss={false} />
    </>
  );
}

export default MyApp;
