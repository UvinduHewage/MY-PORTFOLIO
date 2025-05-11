import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Github, Send, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isHovered, setIsHovered] = useState({
    email: false,
    phone: false,
    linkedin: false,
    github: false
  });
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Submitted:', formData);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
  };
  
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
            Get In Touch
          </span>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4"></div>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column with contact info */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="text-lg mb-8">
              I'm always interested in new opportunities, collaborations, or just a friendly chat about technology. 
              Feel free to reach out through any of these channels or use the form to send me a message directly.
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
                  <ArrowRight 
                    size={20} 
                    className={`transition-all duration-300 transform ${isHovered[contact.id] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} text-white/70`} 
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Right column with contact form */}
          <div className={`bg-white/10 rounded-xl p-6 backdrop-blur-sm transition-all duration-700 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white/80">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white/80">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-white/80">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="What would you like to discuss?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <span>Send Message</span>
                <Send size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;