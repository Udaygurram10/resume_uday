
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import ThreeScene from "./ThreeScene";
import Particles from "./Particles";

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;
      const progress = Math.min(scrollPosition / (sectionHeight * 0.5), 1);
      
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <Particles className="opacity-50" />
      
      <div
        className="container-custom grid lg:grid-cols-2 gap-6 relative z-10 px-6"
        style={{
          transform: `translateY(${scrollProgress * 50}px)`,
          opacity: 1 - scrollProgress * 0.8,
        }}
      >
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <h1 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
            >
              Marketing <span className="text-gradient">Strategist</span> & Digital Growth Expert
            </h1>
            
            <p className="text-lg md:text-xl opacity-80 max-w-xl">
              Crafting innovative digital marketing strategies that convert audiences into customers and build lasting brand engagement.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#portfolio" 
              className="btn-gradient px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              View My Work
            </a>
            
            <a 
              href="#contact" 
              className="px-8 py-3 rounded-full text-lg font-medium border border-brand-teal/30 hover:border-brand-teal bg-transparent hover:bg-white/5 transition-all"
            >
              Get In Touch
            </a>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="w-full h-[400px] md:h-[500px] relative animate-float">
            <ThreeScene />
          </div>
        </div>
      </div>
      
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ArrowDown size={24} />
      </button>
      
      <div className="overlay-gradient" />
    </section>
  );
};

export default Hero;
