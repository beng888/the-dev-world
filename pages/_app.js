import "../styles/globals.css";
import "../styles/test.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import Layout from "../Layout";
import { StyleContextWrapper } from "../src/contexts/StyleContext";

export default function NextApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StyleContextWrapper>
        <Layout>
          <main
            data-scroll-container
            // className="max-w-screen md:max-h-screen"
          >
            <Component {...pageProps} />
          </main>
        </Layout>
      </StyleContextWrapper>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
