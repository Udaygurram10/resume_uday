
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  company: string;
  description: string;
  image: string;
  tags: string[];
}

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Email Marketing Optimization",
      company: "Uncode",
      description: "Increased open rates to 28% through strategic segmentation and personalization, managing end-to-end email marketing for three brands using Mailchimp.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Email Marketing", "Mailchimp", "Automation", "Data Segmentation"]
    },
    {
      id: 2,
      title: "WhatsApp Marketing Campaign",
      company: "Garden Up",
      description: "Generated ₹2L revenue with just ₹3K ad spend through strategic WhatsApp marketing campaigns integrated with Meta and Google Ads.",
      image: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["WhatsApp API", "Meta Ads", "Google Ads", "Business Development"]
    },
    {
      id: 3,
      title: "B2B Lead Generation",
      company: "Totely India",
      description: "Created a database of 1,500 B2B professionals through optimized LinkedIn outreach, generating 32 qualified leads and 17 client meetings.",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["LinkedIn", "B2B Marketing", "Lead Generation", "CRM"]
    },
    {
      id: 4,
      title: "E-commerce Platform Development",
      company: "Freelance",
      description: "Developed a no-code e-commerce platform using Wix and Shopify, increasing sales and online visibility for a local business.",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["No-Code", "E-commerce", "Wix", "Shopify"]
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="portfolio" className="section bg-gradient-to-b from-secondary to-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-medium mb-4">
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Explore my most successful campaigns and projects that drove significant results
          </p>
        </div>

        <div 
          ref={carouselRef} 
          className="relative opacity-0"
        >
          <div className="glass-card p-1 rounded-2xl overflow-hidden shadow-xl">
            <div className="md:grid md:grid-cols-5 gap-0 items-stretch">
              <div 
                className="col-span-2 h-64 md:h-auto overflow-hidden relative"
                style={{
                  backgroundImage: `url(${projects[activeIndex].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>
              
              <div className="col-span-3 p-8 md:p-10 flex flex-col">
                <div className="mb-auto">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold">{projects[activeIndex].title}</h3>
                    <span className="text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                      {projects[activeIndex].company}
                    </span>
                  </div>
                  
                  <p className="opacity-80 mb-6">
                    {projects[activeIndex].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {projects[activeIndex].tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button
                      onClick={prevSlide}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                      aria-label="Previous project"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                      aria-label="Next project"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  
                  <span className="text-sm opacity-60">
                    {activeIndex + 1} / {projects.length}
                  </span>
                  
                  <Link
                    to={`/project/${projects[activeIndex].id}`}
                    className="flex items-center space-x-2 text-brand-cyan hover:underline"
                  >
                    <span>View Details</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/project/1"
            className="btn-gradient px-6 py-3 rounded-full inline-flex items-center space-x-2"
          >
            <span>View All Projects</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
