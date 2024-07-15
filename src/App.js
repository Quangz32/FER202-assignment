import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import MyNavbar from "./component/shared/MyNavbar";
import Shop from "./component/shop/Shop";

import Login from "./component/login/Login";

import { useLocation } from "react-router-dom";
import Cart from "./component/shop/Cart";
import Footer from "./component/shared/Footer";
import Register from "./component/register/Register";
import ChangePassword from "./component/changepassword/ChangePassword";
import Profile from "./component/profile/Profile";

function App() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.endsWith("login") && !location.pathname.endsWith("register") && (
        <MyNavbar></MyNavbar>
      )}

      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="change_password" element={<ChangePassword />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Routes>

      {!location.pathname.endsWith("login") && !location.pathname.endsWith("register") && (
        <div className="my-bg-green-1">
          <Footer></Footer>
        </div>
      )}
    </>
  );
}

export default App;
