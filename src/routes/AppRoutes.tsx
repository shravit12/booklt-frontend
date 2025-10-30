import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Details";
import Checkout from "../pages/Checkout";

import Header from "../components/Header";

const AppRoutes = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/checkout/:id" element={<Checkout />} />
      
    </Routes>
  </Router>
);

export default AppRoutes;
