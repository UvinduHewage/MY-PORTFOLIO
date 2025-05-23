import React, { useState, useEffect } from 'react';
import { Code, Database, Layers, ChevronDown, Github, Linkedin } from 'lucide-react';
import profileImage from '../assets/profile.png';
import Background from './Background';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const typingTexts = [
    'Full-Stack Developer',
    'Data Analytics Enthusiast',
    'Software Engineering Student'
  ];
  
  // Typing effect
  useEffect(() => {
    setIsLoaded(true);
    
    const text = typingTexts[currentTextIndex];
    let typingTimer;
    let deletingTimer;
    
    if (isTyping) {
      if (typedText.length < text.length) {
        typingTimer = setTimeout(() => {
          setTypedText(text.substring(0, typedText.length + 1));
        }, 100);
      } else {
        // Pause at the end before deleting
        typingTimer = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (typedText.length > 0) {
        deletingTimer = setTimeout(() => {
          setTypedText(typedText.substring(0, typedText.length - 1));
        }, 50);
      } else {
        // Move to next text
        setCurrentTextIndex((currentTextIndex + 1) % typingTexts.length);
        setIsTyping(true);
      }
    }
    
    return () => {
      clearTimeout(typingTimer);
      clearTimeout(deletingTimer);
    };
  }, [typedText, isTyping, currentTextIndex]);
  
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Background>
      <section id="home" className="h-screen flex flex-col justify-center items-center pt-2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Profile image */}
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 animate-pulse-slow">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                    <img 
                      src={profileImage} 
                      alt="Uvindu Hewage" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400"; // Fallback image
                      }}
                    />
                  </div>
                </div>
                
                {/* Social icons */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  <a 
                    href="https://github.com/U-WarlockX" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-gradient-to-br from-gray-700 to-gray-900 p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <Github size={20} className="text-white" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/uvindu-udakara-magedara-hewage" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <Linkedin size={20} className="text-white" />
                  </a>
                </div>
              </div>
              
              {/* Name with animated gradient */}
              <h1 className="text-5xl md:text-5xl font-bold mb-6 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 animate-gradient-x">
                  Uvindu Hewage
                </span>
              </h1>
              
              {/* Typing effect */}
              <div className="h-14 mb-3">
                <div className="text-xl md:text-2xl font-medium flex justify-center items-center">
                  <div className="flex items-center">
                    <span className="mr-2 text-cyan-200/80">I'm a</span>
                    <span className="text-white relative">
                      {typedText}
                      <span className="absolute right-0 top-0 h-full w-1 bg-cyan-400 animate-blink"></span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Skill icons */}
              <div className="flex justify-center space-x-6 md:space-x-10 mb-8">
                <div className={`transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 transition-colors duration-300 group">
                    <Code size={32} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="mt-2 text-sm text-cyan-100/70">Development</p>
                </div>
                
                <div className={`transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-400/20 hover:bg-blue-400/30 transition-colors duration-300 group">
                    <Database size={32} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="mt-2 text-sm text-cyan-100/70">Data Analytics</p>
                </div>
                
                <div className={`transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-600/20 hover:bg-cyan-600/30 transition-colors duration-300 group">
                    <Layers size={32} className="text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="mt-2 text-sm text-cyan-100/70">Full-Stack</p>
                </div>
              </div>
              
              {/* CTA button */}
              <div className={`transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
                <button 
                  onClick={scrollToNextSection}
                  className="px-4 py-2 bg-transparent border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center text-cyan-400 text-sm">
                    Explore
                    <ChevronDown size={16} className="ml-2 animate-bounce" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Background>
  );
};

export default Home;