import "@/styles/globals.css";
import useSWR, { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import NavigationBar from "@/components/features/NavigationBar/NavigationBar";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occured while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  const { data: snippets, error, isLoading } = useSWR("/api/snippets", fetcher);

  return (
    <SWRConfig value={{ fetcher }}>
      <div className="pb-16 mb-6">
        <Component
          snippets={snippets}
          error={error}
          isLoading={isLoading}
          {...pageProps}
        />
      </div>
      <NavigationBar />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </SWRConfig>
  );
}
