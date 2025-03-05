
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPostData {
  id: number;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

const mockBlogPosts: BlogPostData[] = [
  {
    id: 1,
    title: "How to Achieve 30% Higher Email Open Rates with Segmentation",
    date: "August 15, 2023",
    readTime: "8 min read",
    category: "Email Marketing",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: [
      "Email marketing remains one of the most effective channels for reaching and engaging customers. However, with the average person receiving countless promotional emails daily, standing out in a crowded inbox is increasingly challenging.",
      "This is where strategic segmentation comes in. By dividing your email list into specific groups based on demographics, behavior, preferences, or purchase history, you can deliver more relevant content that resonates with each segment.",
      "In my recent work with enterprise clients, I implemented advanced segmentation strategies that boosted open rates by 30% on average. Here's how we did it:",
      "First, we analyzed customer data to identify meaningful segments. Rather than using basic demographic information only, we incorporated behavioral data like previous interactions, purchase history, and engagement patterns.",
      "Second, we developed personalized content strategies for each segment. This meant creating targeted subject lines, customized offers, and relevant imagery that appealed to the specific interests of each group.",
      "Third, we optimized send times based on each segment's behavior. By analyzing when different groups were most likely to open emails, we were able to schedule our campaigns for maximum visibility.",
      "Finally, we implemented continuous testing and refinement. A/B testing different elements for each segment allowed us to fine-tune our approach and continuously improve results.",
      "The results were remarkable. Not only did open rates increase by 30%, but click-through rates improved by 25%, and conversion rates saw a 20% lift. This approach demonstrated that relevance is the key to email marketing success in today's competitive landscape."
    ],
    author: {
      name: "Uday Gurram",
      role: "Marketing Strategist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    id: 2,
    title: "WhatsApp Marketing in 2024: The Complete Playbook",
    date: "October 3, 2023",
    readTime: "12 min read",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611746869696-e089a4e78c3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: [
      "As messaging platforms continue to dominate the digital landscape, WhatsApp has emerged as a powerful channel for business communication and marketing. With over 2 billion users globally, WhatsApp offers unprecedented access to customers in a personal and direct way.",
      "In my recent campaign for Garden Up, I developed a comprehensive WhatsApp marketing strategy that generated ₹2L in revenue with just ₹3K in ad spend. Here's the playbook we used:",
      "First, we established a business presence using WhatsApp Business API. This allowed us to create a verified business profile, set up automated responses, and use advanced messaging features.",
      "Next, we built our subscriber list through an integrated approach. We used Meta and Google Ads to drive users to a landing page where they could opt-in to receive WhatsApp updates. We also added QR codes on physical products and in-store displays.",
      "For content strategy, we focused on providing genuine value rather than constant promotions. Our message mix included product updates, gardening tips, care instructions, and exclusive offers at a ratio of 80% value content to 20% promotional content.",
      "We implemented personalized automation workflows based on user behavior. For example, if a customer purchased a certain plant, they would automatically receive care instructions and maintenance reminders specific to that plant.",
      "Finally, we used analytics to continuously optimize our strategy. By tracking metrics like open rates, response rates, and conversion rates, we were able to refine our approach for maximum impact.",
      "The results speak for themselves: with a minimal ad spend of ₹3K, we generated ₹2L in revenue, representing a remarkable 66x ROI. This success demonstrates the immense potential of WhatsApp as a marketing channel when used strategically."
    ],
    author: {
      name: "Uday Gurram",
      role: "Marketing Strategist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    id: 3,
    title: "No-Code E-commerce: Building a Store Without Programming",
    date: "November 22, 2023",
    readTime: "10 min read",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    content: [
      "The rise of no-code tools has democratized e-commerce, allowing entrepreneurs without technical backgrounds to build sophisticated online stores. This approach has opened doors for many business owners who previously faced technical barriers to entry.",
      "As a marketing strategist who works closely with small businesses, I recently helped a client launch a successful e-commerce store using entirely no-code solutions. Here's how we did it:",
      "We chose Shopify as our primary platform due to its user-friendly interface and robust feature set. For customization, we used Pagefly, a visual page builder that allowed us to create unique product pages without writing code.",
      "For marketing automation, we integrated Klaviyo to handle email campaigns and customer segmentation. This allowed us to create automated flows for abandoned carts, welcome series, and post-purchase follow-ups.",
      "To enhance the visual appeal, we used Canva for creating product images and promotional materials. The platform's templates and easy editing features made it simple to maintain consistent branding across all visuals.",
      "For customer service, we implemented a chatbot using ManyChat that could handle common queries and direct more complex issues to human support. This significantly reduced response times and improved customer satisfaction.",
      "Perhaps most importantly, we used Zapier to connect various tools and automate workflows between platforms. This eliminated many manual processes and ensured that data flowed seamlessly between systems.",
      "The results exceeded expectations, with the store generating consistent revenue within the first month of launch. This project demonstrated that with the right no-code tools, it's possible to build a professional, high-performing e-commerce business without writing a single line of code."
    ],
    author: {
      name: "Uday Gurram",
      role: "Marketing Strategist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  }
];

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchBlogPost = () => {
      setIsLoading(true);
      const post = mockBlogPosts.find(post => post.id === Number(id));
      
      setTimeout(() => {
        setBlogPost(post || null);
        setIsLoading(false);
      }, 500); // Simulate loading
    };
    
    fetchBlogPost();
    
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
  
  if (!blogPost) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/#blog" className="btn-gradient px-6 py-3 rounded-full inline-flex items-center">
            <ArrowLeft className="mr-2" size={18} />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      
      <article className="pt-24 pb-20 px-6">
        <div className="container-custom">
          <Link 
            to="/#blog"
            className="inline-flex items-center text-sm opacity-70 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all articles
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-medium mb-4">
                {blogPost.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {blogPost.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center">
                  <img 
                    src={blogPost.author.avatar} 
                    alt={blogPost.author.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover" 
                  />
                  <div>
                    <p className="font-medium">{blogPost.author.name}</p>
                    <p className="text-sm opacity-70">{blogPost.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="flex items-center text-sm opacity-70">
                    <Calendar size={14} className="mr-1" />
                    <span>{blogPost.date}</span>
                  </div>
                  <div className="flex items-center text-sm opacity-70">
                    <Clock size={14} className="mr-1" />
                    <span>{blogPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden mb-12 h-72 sm:h-96 md:h-[500px]">
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              {blogPost.content.map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed opacity-80">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
              <div className="flex space-x-4">
                <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors" aria-label="Share article">
                  <Share2 size={18} />
                </button>
                <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors" aria-label="Bookmark article">
                  <Bookmark size={18} />
                </button>
              </div>
              
              <Link 
                to="/#blog"
                className="btn-gradient px-6 py-3 rounded-full inline-flex items-center"
              >
                <span>More Articles</span>
                <ArrowLeft size={18} className="ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </article>
      
      <Footer />
    </>
  );
};

export default BlogPostDetail;
