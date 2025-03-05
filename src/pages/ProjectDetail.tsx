
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Tag, Calendar, ExternalLink, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Project {
  id: number;
  title: string;
  company: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  image: string;
  gallery: string[];
  tags: string[];
  date: string;
  website?: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Email Marketing Optimization",
    company: "Uncode",
    description: "Strategic email marketing campaign that increased open rates by 30% through advanced segmentation and personalization techniques.",
    challenge: "Uncode was struggling with low email engagement rates, with open rates hovering around 12% and click-through rates at just 2%. Their email list contained thousands of subscribers, but the one-size-fits-all approach was failing to resonate with their diverse audience segments.",
    solution: "I implemented a comprehensive email marketing strategy that focused on advanced segmentation and personalization. First, we analyzed customer data to identify meaningful segments based on purchase history, engagement patterns, and preferences. Then, we created targeted content for each segment, optimized send times based on historical engagement data, and implemented A/B testing for continuous improvement.",
    results: "The campaign achieved remarkable success with open rates increasing to 28% (a 130% improvement) and click-through rates reaching 8% (a 300% improvement). Conversion rates from email campaigns improved by 45%, and the client was able to effectively manage email marketing for three separate brands using the strategies I implemented.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586282391129-76a4d8dae3c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Email Marketing", "Mailchimp", "Automation", "Data Segmentation"],
    date: "June 2023 - August 2023",
    website: "https://uncode.com"
  },
  {
    id: 2,
    title: "WhatsApp Marketing Campaign",
    company: "Garden Up",
    description: "Generated ₹2L revenue with just ₹3K ad spend through strategic WhatsApp marketing campaigns integrated with Meta and Google Ads.",
    challenge: "Garden Up, a plant nursery startup, needed to boost sales during a seasonal slump while working with a limited marketing budget. Traditional digital advertising channels were proving costly with diminishing returns, and they needed an innovative approach to reach their target audience more effectively.",
    solution: "I developed a comprehensive WhatsApp marketing strategy that leveraged the personal nature of the platform. We created a WhatsApp Business account, built a subscriber list through targeted Meta and Google Ads, and implemented automated workflows for different customer segments. The content strategy focused on providing value with gardening tips and care instructions, supplemented by strategic promotional offers.",
    results: "The campaign generated ₹2L in revenue with just ₹3K in ad spend, representing a remarkable 66x ROI. Customer engagement improved significantly, with 85% of messages being read within the first hour. The WhatsApp channel also provided valuable customer feedback and enabled real-time customer support, further enhancing the customer experience.",
    image: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611746869696-e089a4e78c3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565073625772-9ee7e597d9e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1628173685751-f213163df8af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["WhatsApp API", "Meta Ads", "Google Ads", "Business Development"],
    date: "January 2023 - March 2023",
    website: "https://gardenup.in"
  },
  {
    id: 3,
    title: "B2B Lead Generation",
    company: "Totely India",
    description: "Created a database of 1,500 B2B professionals through optimized LinkedIn outreach, generating 32 qualified leads and 17 client meetings.",
    challenge: "Totely India, a B2B software services provider, was struggling to scale their lead generation efforts. Their existing process relied heavily on referrals and manual prospecting, which was time-consuming and produced inconsistent results. They needed a systematic approach to identify, engage, and convert high-quality B2B leads.",
    solution: "I implemented a comprehensive LinkedIn-focused lead generation strategy. This included optimizing the company's LinkedIn presence, creating targeted content that positioned Totely as an industry authority, and developing a strategic outreach campaign using Sales Navigator to identify and connect with potential clients. I also implemented a CRM system to track interactions and measure conversion rates at each stage of the pipeline.",
    results: "The campaign created a database of 1,500 targeted B2B professionals within the first three months. From this database, we generated 32 qualified leads that converted into 17 client meetings and 6 closed deals. The structured approach also reduced the sales cycle by 35%, allowing the company to scale their business development efforts more efficiently.",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["LinkedIn", "B2B Marketing", "Lead Generation", "CRM"],
    date: "September 2022 - December 2022"
  },
  {
    id: 4,
    title: "E-commerce Platform Development",
    company: "Freelance",
    description: "Developed a no-code e-commerce platform using Wix and Shopify, increasing sales and online visibility for a local business.",
    challenge: "A local artisan business was looking to expand their market reach by establishing an online presence. With limited technical expertise and budget constraints, they needed a solution that would allow them to quickly launch a professional e-commerce store without requiring extensive development resources.",
    solution: "I designed and implemented a no-code e-commerce solution using a combination of Wix and Shopify. The approach focused on creating a visually appealing storefront that highlighted the craftsmanship of the products, implementing secure payment processing, and developing an intuitive navigation system. I also set up automated inventory management and integrated marketing tools to help drive traffic to the new online store.",
    results: "The e-commerce platform launched within three weeks, significantly faster than traditional development approaches. Within the first month, the store generated a 35% increase in overall sales compared to in-person sales alone. The client was able to manage the platform independently after a brief training period, making the solution sustainable for their small business operations.",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526570207772-784d36084510?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524750103665-27d8a7ae3c59?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["No-Code", "E-commerce", "Wix", "Shopify"],
    date: "March 2022 - April 2022",
    website: "https://example-shop.com"
  }
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchProject = () => {
      setIsLoading(true);
      const foundProject = mockProjects.find(p => p.id === Number(id));
      
      setTimeout(() => {
        setProject(foundProject || null);
        if (foundProject) {
          setActiveImage(foundProject.image);
        }
        setIsLoading(false);
      }, 500); // Simulate loading
    };
    
    fetchProject();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }
  
  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-8">The project you're looking for doesn't exist or has been moved.</p>
          <Link to="/#portfolio" className="btn-gradient px-6 py-3 rounded-full inline-flex items-center">
            <ArrowLeft className="mr-2" size={18} />
            Back to Portfolio
          </Link>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      
      <section className="pt-24 pb-20 px-6">
        <div className="container-custom">
          <Link 
            to="/#portfolio"
            className="inline-flex items-center text-sm opacity-70 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to portfolio
          </Link>
          
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-0">
                    {project.title}
                  </h1>
                  <span className="text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full text-sm">
                    {project.company}
                  </span>
                </div>
                
                <p className="text-lg opacity-80 mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 opacity-70" />
                    <span className="text-sm opacity-70">{project.date}</span>
                  </div>
                  
                  {project.website && (
                    <a 
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-brand-cyan hover:underline"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      <span>Visit Website</span>
                    </a>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <div 
                      key={index} 
                      className="flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                    >
                      <Tag size={12} className="mr-1 opacity-70" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-10">
                <div className="rounded-2xl overflow-hidden mb-4 h-72 sm:h-96 md:h-[500px]">
                  <img 
                    src={activeImage || project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {project.gallery.map((image, index) => (
                    <div 
                      key={index} 
                      onClick={() => setActiveImage(image)}
                      className={`rounded-lg overflow-hidden h-24 cursor-pointer transition-all ${
                        activeImage === image ? 'ring-2 ring-brand-cyan' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Project image ${index + 1}`}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center mr-3 text-sm">1</span>
                    Challenge
                  </h2>
                  <p className="opacity-80 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center mr-3 text-sm">2</span>
                    Solution
                  </h2>
                  <p className="opacity-80 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center mr-3 text-sm">3</span>
                    Results
                  </h2>
                  <p className="opacity-80 leading-relaxed">
                    {project.results}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="glass-card p-6 rounded-2xl sticky top-24">
                <h3 className="text-xl font-bold mb-6">More Projects</h3>
                
                <div className="space-y-4">
                  {mockProjects
                    .filter(p => p.id !== project.id)
                    .slice(0, 3)
                    .map(p => (
                      <Link 
                        key={p.id}
                        to={`/project/${p.id}`}
                        className="block group"
                      >
                        <div className="flex items-center p-3 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                            <img 
                              src={p.image} 
                              alt={p.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                          <div>
                            <h4 className="font-bold line-clamp-1">{p.title}</h4>
                            <p className="text-sm opacity-70 line-clamp-1">{p.company}</p>
                          </div>
                          <ChevronRight size={16} className="ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link 
                    to="/#contact"
                    className="btn-gradient w-full py-3 rounded-full flex items-center justify-center"
                  >
                    <span>Start a Project</span>
                    <ArrowLeft size={16} className="ml-2 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default ProjectDetail;
