import NavigationBar from "../features/NavigationBar/NavigationBar";

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <NavigationBar />
    </>
  );
}
