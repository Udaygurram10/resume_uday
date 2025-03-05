
import { useEffect, useRef } from "react";
import { ArrowRight, Clock } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const Blog = () => {
  const blogPostsRef = useRef<HTMLDivElement>(null);
  
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "How to Achieve 30% Higher Email Open Rates with Segmentation",
      excerpt: "Learn the advanced segmentation techniques that helped me boost email open rates by 30% for enterprise clients.",
      date: "August 15, 2023",
      readTime: "8 min read",
      category: "Email Marketing",
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "WhatsApp Marketing in 2024: The Complete Playbook",
      excerpt: "A comprehensive guide to leveraging WhatsApp for business growth, automation, and customer engagement.",
      date: "October 3, 2023",
      readTime: "12 min read",
      category: "Social Media",
      image: "https://images.unsplash.com/photo-1611746869696-e089a4e78c3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "No-Code E-commerce: Building a Store Without Programming",
      excerpt: "How I built a successful e-commerce store using no-code tools that generated consistent revenue.",
      date: "November 22, 2023",
      readTime: "10 min read",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];
  
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
    
    if (blogPostsRef.current) {
      observer.observe(blogPostsRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section id="blog" className="section bg-gradient-to-b from-background to-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-medium mb-4">
            Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Thoughts, strategies, and insights on digital marketing and growth
          </p>
        </div>
        
        <div 
          ref={blogPostsRef}
          className="grid md:grid-cols-3 gap-6 md:gap-8 opacity-0"
        >
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="glass-card overflow-hidden rounded-2xl group hover:shadow-xl transition-shadow"
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-teal/10 text-brand-cyan text-xs">
                    {post.category}
                  </span>
                  
                  <div className="flex items-center text-sm opacity-60">
                    <Clock size={14} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                
                <p className="opacity-70 mb-6 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-60">{post.date}</span>
                  
                  <a 
                    href="#" 
                    className="flex items-center text-brand-cyan hover:underline text-sm font-medium"
                  >
                    <span>Read More</span>
                    <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="btn-gradient px-6 py-3 rounded-full inline-flex items-center space-x-2"
          >
            <span>View All Articles</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
