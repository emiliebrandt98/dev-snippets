import "@/styles/globals.css";
import useSWR, { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import NavigationBar from "@/components/features/NavigationBar/NavigationBar";
import { useState, useEffect } from "react";
import { EMPTY_FILTER } from "@/lib/filter/filterSnippets";
import { SessionProvider, useSession } from "next-auth/react";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import { useRouter } from "next/router";

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

function getTheme(selectedMode) {
  if (selectedMode === "automatic") {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  }
  return selectedMode;
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function AppContent({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { status } = useSession();
  const {
    data: snippets,
    error,
    isLoading,
  } = useSWR(status === "authenticated" ? "/api/snippets" : null, fetcher);

  const router = useRouter();
  const pagesWithoutNavigation = ["/login", "/register"];
  const showNavigation = !pagesWithoutNavigation.includes(router.pathname);

  const favoritesKey =
    status === "authenticated" ? "/api/snippets/favorites" : null;

  const { data: favoriteData } = useSWR(favoritesKey, fetcher);
  const favoriteSnippets = favoriteData ?? [];

  const [search, setSearch] = useState("");
  const [activeFilterItems, setActiveFilterItems] = useState(EMPTY_FILTER);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("colorMode") ?? "automatic";
    }
    return "automatic";
  });

  function updateTheme(selectedMode) {
    const theme = getTheme(selectedMode);
    applyTheme(theme);
    setIsDarkMode(theme === "dark");
  }

  function handleToggleColorMode(event) {
    const selectedMode = event.target.value;
    setMode(selectedMode);
    localStorage.setItem("colorMode", selectedMode);
  }

  useEffect(() => {
    updateTheme(mode);
  }, [mode]);

  return (
    <AuthGuard>
      <SWRConfig value={{ fetcher }}>
        <div
          className={
            showNavigation
              ? "pb-16 mb-8 lg:pb-0 lg:mt-8 lg:mr-8 lg:mb-0 lg:pl-72"
              : "mb-8"
          }
        >
          <Component
            snippets={snippets}
            error={error}
            isLoadingSubmit={isLoadingSubmit}
            onIsLoadingSubmit={setIsLoadingSubmit}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onSetErrorMessage={setErrorMessage}
            search={search}
            onSearch={setSearch}
            activeFilterItems={activeFilterItems}
            onActiveFilterItems={setActiveFilterItems}
            favoriteSnippets={favoriteSnippets}
            {...pageProps}
            mode={mode}
            isDarkMode={isDarkMode}
            onToggleColorMode={handleToggleColorMode}
          />
        </div>
        {showNavigation && <NavigationBar />}

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
    </AuthGuard>
  );
}
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}
