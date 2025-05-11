import React, { useState, useEffect } from 'react';
import { User, BookOpen, Award, ChevronRight, Code, Database, BookMarked } from 'lucide-react';
import profileImage from '../assets/profile.png';
import Background from './Background';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <Background>
      <section id="about" className="min-h-screen pt-16 pb-16 flex flex-col justify-center text-white">
        <div className={`container mx-auto px-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient-x">
              About Me
            </span>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4"></div>
          </h2>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className={`bg-black/50 border border-cyan-500/30 rounded-full p-1 backdrop-blur-md transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <button 
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'personal' ? 'bg-cyan-500/20 text-cyan-300' : 'text-white/70 hover:text-cyan-300'}`}
                onClick={() => setActiveTab('personal')}
              >
                <span className="flex items-center">
                  <User size={16} className="mr-2" />
                  Personal
                </span>
              </button>
              <button 
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'education' ? 'bg-cyan-500/20 text-cyan-300' : 'text-white/70 hover:text-cyan-300'}`}
                onClick={() => setActiveTab('education')}
              >
                <span className="flex items-center">
                  <BookOpen size={16} className="mr-2" />
                  Education
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left column with image */}
            <div className={`flex justify-center transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-20 animate-pulse-slow"></div>
                <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img 
                    src={profileImage}
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating skill badges */}
                <div className="absolute -right-4 top-10 w-16 h-16 flex items-center justify-center rounded-full bg-cyan-400/20 border border-cyan-400/50 group animate-float-slow" style={{ animationDelay: '0s' }}>
                  <Code size={28} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <div className="absolute -left-8 top-1/4 w-16 h-16 flex items-center justify-center rounded-full bg-blue-400/20 border border-blue-400/50 group animate-float-slow" style={{ animationDelay: '1s' }}>
                  <Database size={28} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <div className="absolute -bottom-2 right-2 w-16 h-16 flex items-center justify-center rounded-full bg-cyan-600/20 border border-cyan-600/50 group animate-float-slow" style={{ animationDelay: '2s' }}>
                  <BookMarked size={28} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Right column with content */}
            <div className={`bg-black/40 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-md transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              {activeTab === 'personal' ? (
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    I am a dedicated software engineering student with a strong foundation in data analysis and IT principles. 
                    My goal is to gain hands-on experience with real-world data and IT solutions, contribute to impactful projects, 
                    and continuously grow in the fast-evolving tech industry.
                  </p>
                  <ul className="space-y-2">
                    <li className={`flex items-start transition-all duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}`} style={{ transitionDelay: '700ms' }}>
                      <ChevronRight size={20} className="mr-2 text-cyan-400 flex-shrink-0 mt-1" />
                      <span>Passionate about creating intuitive and innovative digital experiences</span>
                    </li>
                    <li className={`flex items-start transition-all duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                      <ChevronRight size={20} className="mr-2 text-cyan-400 flex-shrink-0 mt-1" />
                      <span>Constantly learning new technologies and methodologies</span>
                    </li>
                    <li className={`flex items-start transition-all duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}`} style={{ transitionDelay: '900ms' }}>
                      <ChevronRight size={20} className="mr-2 text-cyan-400 flex-shrink-0 mt-1" />
                      <span>Dedicated to creating accessible and performant applications</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`flex items-center space-x-4 transition-all duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}`} style={{ transitionDelay: '700ms' }}>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-cyan-400/20 flex items-center justify-center border border-cyan-500/50 group hover:bg-cyan-400/30 transition-colors duration-300">
                        <Award size={24} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">SLIIT</h3>
                      <p className="text-white/80">BSc (Hons) in IT (2022 - Present)</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-4 transition-all duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}`} style={{ transitionDelay: '900ms' }}>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-blue-400/20 flex items-center justify-center border border-blue-500/50 group hover:bg-blue-400/30 transition-colors duration-300">
                        <BookOpen size={24} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Royal College, Colombo 07</h3>
                      <p className="text-white/80">GCE A/L Physical Science (1C, 2S)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Background>
  );
};

export default About;