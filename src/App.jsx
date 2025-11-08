import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import WISA from "./sections/WISA";
import Contact from "./sections/Contact";
import Reviews from "./sections/Reviews";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Portfolio from "./sections/Portfolio";

export default function App() {
  return (
    <div className="relative gradient text-white">
      <CustomCursor />
      <Navbar />
      <Home />
      <WISA />
      <Portfolio />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}
