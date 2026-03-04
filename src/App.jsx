import Nav from "./components/Nav";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default App;
