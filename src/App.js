import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import MyNavbar from "./shared/MyNavbar";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
