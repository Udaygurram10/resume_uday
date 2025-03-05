
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <footer className="bg-gradient-to-b from-background to-brand-dark py-12 px-6">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold font-display">Uday Gurram</h2>
            <p className="text-sm opacity-60 mt-1">Marketing Strategist & Digital Growth Expert</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
            <a href="#about" className="nav-link">About</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#blog" className="nav-link">Insights</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="mt-6 md:mt-0 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-60 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Uday Gurram. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://linkedin.com/in/uday-gurram/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-brand-cyan transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-white/20">|</span>
            <a 
              href="mailto:Udaygurram10@gmail.com"
              className="text-sm hover:text-brand-cyan transition-colors"
            >
              Email
            </a>
            <span className="text-white/20">|</span>
            <a 
              href="tel:+919154266087"
              className="text-sm hover:text-brand-cyan transition-colors"
            >
              Phone
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
