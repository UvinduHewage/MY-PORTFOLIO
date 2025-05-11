import React, { useState, useEffect, useRef } from 'react';
import { Code, Terminal, Database, Server, Globe, BookOpen, MessageSquare } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const skillCategories = [
    {
      id: 'languages',
      title: 'Languages',
      icon: <Code size={24} />,
      skills: ['Java', 'JavaScript', 'PHP', 'SQL', 'Python', 'Kotlin', 'HTML5', 'CSS3', 'R'],
      color: 'from-blue-500 to-indigo-600',
      description: 'Programming and markup languages that I am proficient in.'
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Libraries',
      icon: <Terminal size={24} />,
      skills: ['React', 'Node.js', 'Express.js', 'Firebase', 'Tailwind CSS'],
      color: 'from-green-500 to-teal-600',
      description: 'Tools that help me build scalable and maintainable applications.'
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      icon: <Server size={24} />,
      skills: ['Git', 'VS Code', 'MySQL', 'MongoDB', 'Firebase', 'Postman'],
      color: 'from-purple-500 to-pink-600',
      description: 'Development environments and platforms I use daily.'
    },
    {
      id: 'technical',
      title: 'Technical Skills',
      icon: <Database size={24} />,
      skills: ['OOP', 'Data Structures', 'Algorithms', 'SQL/NoSQL', 'UML', 'Business Analytics', 'RESTful APIs'],
      color: 'from-orange-500 to-red-600',
      description: 'Core computer science and software engineering concepts.'
    },
    {
      id: 'soft',
      title: 'Soft Skills',
      icon: <MessageSquare size={24} />,
      skills: ['Problem Solving', 'Communication', 'Teamwork', 'Time Management', 'Leadership'],
      color: 'from-yellow-400 to-amber-600',
      description: 'Essential interpersonal and professional abilities.'
    },
    {
      id: 'languages-spoken',
      title: 'Languages Spoken',
      icon: <Globe size={24} />,
      skills: ['Sinhala (Native)', 'English (Fluent)'],
      color: 'from-cyan-500 to-blue-600',
      description: 'Human languages I communicate in.'
    }
  ];

  const handleCategoryHover = (id) => {
    setActiveCategory(id);
  };

  const getProficiencyColor = (index, total) => {
    const position = index / (total - 1);
    if (position < 0.33) return 'bg-green-500';
    if (position < 0.66) return 'bg-blue-500';
    return 'bg-purple-500';
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="min-h-screen py-16 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden"
    >
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
            My Skills
          </span>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4"></div>
        </h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Skill category cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {skillCategories.map((category, index) => (
              <div
                key={category.id}
                className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={() => handleCategoryHover(null)}
              >
                <div className={`bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-${category.color.split(' ')[0]}/20 h-full relative group`}>
                  {/* Animated left border */}
                  <div 
                    className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${category.color} transition-all duration-500`}
                    style={{ 
                      height: activeCategory === category.id ? '100%' : '30%',
                      opacity: activeCategory === category.id ? 1 : 0.7
                    }}
                  ></div>
                  
                  <div className="p-6 md:p-6">
                    <div className="flex items-start">
                      {/* Category icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg mr-4 flex items-center justify-center bg-gradient-to-br ${category.color} shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        {category.icon}
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                          {category.title}
                        </h3>
                        <p className="text-white/80 mb-4 text-sm">
                          {category.description}
                        </p>
                        
                        {/* Skills with proficiency bars */}
                        <div className="space-y-3">
                          {category.skills.map((skill, i) => (
                            <div 
                              key={i}
                              className={`transition-all duration-500 delay-${i * 100} ${activeCategory === category.id ? 'opacity-100 translate-x-0' : 'opacity-70 -translate-x-2'}`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-white/90">{skill}</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getProficiencyColor(i, category.skills.length)} rounded-full transition-all duration-1000`}
                                  style={{ 
                                    width: activeCategory === category.id ? `${Math.random() * 30 + 70}%` : '0%',
                                    opacity: activeCategory === category.id ? 1 : 0
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Learning section */}
          <div className={`text-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <BookOpen size={20} className="mr-3 text-purple-400" />
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-1">Currently Learning</h3>
                <p className="text-white/80">TypeScript, GraphQL, Next.js, AWS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;