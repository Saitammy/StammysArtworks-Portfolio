import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import Shop from "./pages/Shop";

export default function App() {
  const location = useLocation();

  return (
    <div className="relative text-white bg-black min-h-screen">
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
