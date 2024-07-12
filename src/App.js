import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import MyNavbar from "./shared/MyNavbar";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar></MyNavbar>
        <Routes>
          <Route path="home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
