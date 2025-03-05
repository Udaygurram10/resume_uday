
import { useEffect, useRef } from "react";
import { Award, Briefcase, Code, Lightbulb, Mail, MapPin, Phone } from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

const About = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  
  const skills: Skill[] = [
    { name: "Email Marketing", icon: <Mail className="w-5 h-5" /> },
    { name: "Marketing Strategy", icon: <Lightbulb className="w-5 h-5" /> },
    { name: "Business Development", icon: <Briefcase className="w-5 h-5" /> },
    { name: "No-Code Development", icon: <Code className="w-5 h-5" /> },
    { name: "Lead Generation", icon: <Award className="w-5 h-5" /> },
  ];
  
  const experiences: Experience[] = [
    {
      company: "Uncode",
      role: "Email Marketing Specialist",
      period: "12/2024 - Present",
      location: "Hyderabad",
      achievements: [
        "Managing end-to-end email marketing for three brands using Mailchimp",
        "Expertise in email warmup, data segmentation, automation, and Zapier integrations",
        "Consistently achieving an average open rate of 28% while sending over 1 lakh emails per month",
        "Strategically leveraging automation and segmentation to enhance audience engagement and retention"
      ]
    },
    {
      company: "Garden Up",
      role: "Marketing & Backend Ops",
      period: "01/2024 - 12/2024",
      location: "Mumbai",
      achievements: [
        "Enhanced business development by strategizing and launching WhatsApp marketing campaigns, generating ₹2L revenue with a targeted ₹3K ad spend through Meta and Google Ads",
        "Enhanced customer engagement by 30% by implementing WhatsApp API for automated reminders with Y Cloud"
      ]
    },
    {
      company: "Totely India",
      role: "Growth Marketing Strategist",
      period: "06/2023 - 05/2024",
      location: "Hyderabad",
      achievements: [
        "Led marketing campaigns for the Shipment Visibility product, increasing engagement by 60% and generating 32 leads with targeted email strategies via Mailchimp",
        "Optimized LinkedIn outreach to gather a data set of 1,500 B2B professionals for email marketing, generating 32 leads and scheduling 17 client meetings",
        "Successfully onboarded 'Fasttrack' car care client in Hyderabad, providing dedicated customer support"
      ]
    },
    {
      company: "Freelance",
      role: "Digital Marketing Manager & Web Developer",
      period: "08/2022 - 06/2023",
      location: "Hyderabad",
      achievements: [
        "Developed a no-code e-commerce platform at 18, increasing sales and online visibility for my father's business using tools like Wix and Shopify",
        "Transitioned from part-time consulting to full-time freelance digital marketing, focusing on lead generation, branding, and online growth strategies for multiple clients"
      ]
    }
  ];
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section id="about" className="section bg-gradient-to-b from-background to-secondary relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-medium mb-4">
            About Me
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            A self-taught digital marketing specialist with expertise in email campaigns, 
            growth strategies, and no-code platform development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="glass-card p-8 opacity-0" ref={skillsRef}>
            <h3 className="text-2xl font-bold mb-6">Education & Skills</h3>
            
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-2">Mahatma Gandhi Institute of Technology</h4>
              <p className="opacity-70">Bachelor of Technology in Civil Engineering</p>
              <p className="opacity-70 text-sm">08/2018 - 08/2022 • Hyderabad</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Core Skills</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-cyan">
                      {skill.icon}
                    </div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-4">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "A/B Testing", "API", "Asana", "Canva", "CMS", "Content Strategy", 
                    "Customer Segmentation", "Email Marketing", "Figma", "Google Ads", 
                    "Google Analytics", "LinkedIn Ads", "Mailchimp", "Marketing", "PPC", 
                    "SEO", "Shopify", "Social Media Marketing", "Wix", "WordPress"
                  ].map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 opacity-0" ref={experienceRef}>
            <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="border-b border-white/10 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium">{exp.company}</h4>
                    <span className="text-sm opacity-70">{exp.period}</span>
                  </div>
                  <p className="font-medium text-brand-cyan mb-1">{exp.role}</p>
                  <div className="flex items-center text-sm opacity-70 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{exp.location}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm opacity-80 flex">
                        <span className="mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="inline-block px-6 py-3 rounded-full bg-brand-teal/10 text-brand-cyan mb-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 9154266087</span>
            </div>
          </div>
          <div className="inline-block px-6 py-3 rounded-full bg-brand-teal/10 text-brand-cyan mb-4 ml-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Udaygurram10@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
