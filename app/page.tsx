import AboutSection from "./components/AboutSection";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Manifesto from "./components/Manifesto";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AboutSection/>
      <Manifesto/>
      <Footer/>
    </div>
  );
}
