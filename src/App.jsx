import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Reviews from "./sections/Reviews";
import Home from "./sections/Home";

export default function App() {
  return (
    <div className="relative text-white">
      <CustomCursor />
      <Navbar />
      <Home />
    </div>
  );
}
