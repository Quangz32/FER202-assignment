import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import MyNavbar from "./shared/MyNavbar";

import Login from "./login/Login";

import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.endsWith("login") && <MyNavbar></MyNavbar>}

      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
