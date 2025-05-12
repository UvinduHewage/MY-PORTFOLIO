import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Github, FileText, Award, Zap, Code, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState({
    email: false,
    phone: false,
    linkedin: false,
    github: false
  });
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactLinks = [
    {
      id: 'email',
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'hewageuvindu@gmail.com',
      href: 'mailto:hewageuvindu@gmail.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'phone',
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+94 71 945 6781',
      href: 'tel:+94719456781',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'linkedin',
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'uvindu-udakara-magedara-hewage',
      href: 'https://www.linkedin.com/in/uvindu-udakara-magedara-hewage',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'github',
      icon: <Github size={24} />,
      label: 'GitHub',
      value: 'U-WarlockX',
      href: 'https://github.com/U-WarlockX',
      color: 'from-purple-600 to-purple-800'
    }
  ];

  const professionalHighlights = [
    {
      icon: <FileText size={24} />,
      title: 'Comprehensive Portfolio',
      description: 'Explore my detailed professional journey and achievements.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <Award size={24} />,
      title: 'Certifications & Achievements',
      description: 'Recognized excellence in technical innovation and problem-solving.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Zap size={24} />,
      title: 'Quick Collaboration',
      description: 'Rapid response and efficient communication channels.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: <Code size={24} />,
      title: 'Technical Consultation',
      description: 'Expert advice on complex technical challenges and solutions.',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-16 bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5 animate-pulse"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.1 + 0.05
            }}
          />
        ))}
      </div>
      
      <div className={`container mx-auto px-4 md:px-8 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Let's Connect
          </span>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4"></div>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column with contact info */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="text-lg mb-8">
              I'm passionate about creating innovative solutions and connecting with like-minded professionals. 
              Whether you're looking to collaborate, discuss a project, or explore new opportunities, I'm always eager to engage.
            </p>
            
            <div className="space-y-4">
              {contactLinks.map((contact, index) => (
                <a
                  key={contact.id}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center p-4 rounded-xl transition-all duration-300 bg-white/10 backdrop-blur-sm hover:bg-white/20 group`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setIsHovered(prev => ({ ...prev, [contact.id]: true }))}
                  onMouseLeave={() => setIsHovered(prev => ({ ...prev, [contact.id]: false }))}
                >
                  <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center bg-gradient-to-br ${contact.color}`}>
                    {contact.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-white/70">{contact.label}</p>
                    <p className="font-semibold">{contact.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Right column with professional highlights */}
          <div className={`space-y-6 transition-all duration-700 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Professional Engagement
            </h3>
            <div className="space-y-4">
              {professionalHighlights.map((highlight, index) => (
                <div 
                  key={highlight.title}
                  className="bg-white/10 rounded-xl p-4 backdrop-blur-sm flex items-center transition-all duration-300 hover:bg-white/20"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center bg-gradient-to-br ${highlight.color}`}>
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{highlight.title}</h4>
                    <p className="text-sm text-white/70">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <MessageSquare size={18} className="mr-2" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;