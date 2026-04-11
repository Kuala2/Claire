import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { WhyChooseUsSection } from "./components/sections/WhyChooseUsSection";
import { ServicesPricingSection } from "./components/sections/ServicesPricingSection";
import { TeamSection } from "./components/sections/TeamSection";
import { PortfolioSection } from "./components/sections/PortfolioSection";
import { FAQSection } from "./components/sections/FAQSection";
import { CTASection } from "./components/sections/CTASection";
import { MapSection } from "./components/sections/MapSection";
import { FooterSection } from "./components/sections/FooterSection";

import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <WhyChooseUsSection />
          <ServicesPricingSection />
          <TeamSection />
          <PortfolioSection />
          <FAQSection />
          <CTASection />
          <MapSection />
        </main>
        <FooterSection />
      </div>
    </BookingProvider>
  );
}

export default App;
