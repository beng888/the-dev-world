import "../styles/globals.css";
import "../styles/test.css";
import tw from "twin.macro";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

export default function NextApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main data-scroll-container className="container">
        <Component {...pageProps} />
        {/* <div
        id="position"
        style={{
          height: "3rem",
          width: "5rem",
          position: "fixed",
          inset: "0",
          margin: "auto",
          background: "green",
        }}
      ></div> */}
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
