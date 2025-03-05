
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (!anchor) return;
      
      e.preventDefault();
      
      const href = anchor.getAttribute('href');
      if (!href) return;
      
      const targetElement = document.querySelector(href);
      if (!targetElement) return;
      
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    };
    
    // Use event delegation on the main element
    if (mainRef.current) {
      mainRef.current.addEventListener('click', handleAnchorClick);
    }
    
    return () => {
      if (mainRef.current) {
        mainRef.current.removeEventListener('click', handleAnchorClick);
      }
    };
  }, []);
  
  return (
    <main ref={mainRef} className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
