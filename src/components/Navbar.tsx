
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-md"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between px-6">
        <Link to="/" className="flex items-center space-x-2 z-10">
          <span className="text-xl font-bold font-display">Uday Gurram</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link font-medium">
            Home
          </Link>
          <Link to="#about" className="nav-link font-medium">
            About
          </Link>
          <Link to="#portfolio" className="nav-link font-medium">
            Portfolio
          </Link>
          <Link to="#blog" className="nav-link font-medium">
            Insights
          </Link>
          <Link 
            to="#contact"
            className="btn-gradient px-5 py-2 rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-10 p-2 rounded-full bg-background/20 backdrop-blur-md"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 glass-dark md:hidden flex flex-col items-center justify-center space-y-8 transition-all duration-300 ease-in-out",
            isMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          )}
        >
          <Link
            to="/"
            className="text-2xl font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="#about"
            className="text-2xl font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="#portfolio"
            className="text-2xl font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            to="#blog"
            className="text-2xl font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Insights
          </Link>
          <Link
            to="#contact"
            className="btn-gradient px-6 py-3 rounded-full text-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
