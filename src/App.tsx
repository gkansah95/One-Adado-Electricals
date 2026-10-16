import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { OurWork } from './components/OurWork';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Factory electrical works');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestQuote = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Focus on the full name field after scrolling
      setTimeout(() => {
        const nameInput = document.getElementById('fullName');
        if (nameInput) {
          nameInput.focus();
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-slate-800 font-sans selection:bg-[#79CDEE]/30 selection:text-[#18266B] pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar onRequestQuote={handleRequestQuote} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onRequestQuote={handleRequestQuote} />
        <About />
        <Services onSelectService={handleSelectService} />
        <OurWork onRequestQuote={handleRequestQuote} />
        <Process />
        <Contact
          selectedService={selectedService}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onRequestQuote={handleRequestQuote}
      />

      {/* Privacy Policy Accessible Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileStickyBar onRequestQuote={handleRequestQuote} />
    </div>
  );
}
