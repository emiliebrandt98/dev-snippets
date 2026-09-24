import "@/styles/globals.css";
import useSWR, { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import NavigationBar from "@/components/features/NavigationBar/NavigationBar";
import Link from "next/link";
import { Plus } from "lucide-react";

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
      <div className="pb-16 md:pb-0">
        <Component
          snippets={snippets}
          error={error}
          isLoading={isLoading}
          {...pageProps}
        />
        <Link
          href={"/snippet/create-snippet"}
          aria-label="create snippet"
          className="fixed bottom-22 right-6 z-50 inline-flex items-center justify-center w-10 h-10 rounded-lg  bg-purple-600 text-white hover:bg-purple-700 shadow-lg"
        >
          <Plus size={16} />
        </Link>
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
