import "@/styles/globals.css";
import useSWR, { SWRConfig } from "swr";

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
      <Component
        snippets={snippets}
        error={error}
        isLoading={isLoading}
        {...pageProps}
      />
      ;
    </SWRConfig>
  );
}
