import AboutSection from "./components/AboutSection";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Manifesto from "./components/Manifesto";
import Footer from "./components/Footer";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Muhammed Oroye',
    alternateName: ['Muhammed Oroye Portfolio', 'MO'],
    url: 'https://muhammedoroye.org',
  }

  return (
    <div>
      {/* This invisible script tells search engines the official site name */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <Hero />
      <AboutSection />
      <Manifesto />
      <Footer />
    </div>
  );
}
