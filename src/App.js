import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import MyNavbar from "./component/shared/MyNavbar";
import Shop from "./component/shop/Shop";

import Login from "./component/login/Login";

import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.endsWith("login") && <MyNavbar></MyNavbar>}

      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="shop" element={<Shop />}></Route>
      </Routes>
    </>
  );
}

export default App;
