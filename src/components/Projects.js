import React, { useState, useEffect, useRef } from 'react';
import { Code, Calendar, Truck, Hotel, Github, ExternalLink, ChevronRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
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
  
  interface Project {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    tech: string[];
    color: string;
    features: string[];
    status?: string;
  }

  const projects: Project[] = [
    {
      id: 'tinkerbell',
      title: 'Tinkerbell Vehicle Rental System',
      description: 'Developed a full-stack rental platform using PHP, JavaScript, HTML, and CSS. Implemented booking management, user authentication, and vehicle availability checks with MySQL backend.',
      icon: <Truck size={24} />,
      tech: ['PHP', 'JavaScript', 'HTML/CSS', 'MySQL'],
      color: 'from-blue-500 to-indigo-600',
      features: [
        'User authentication and role-based access control',
        'Real-time vehicle availability tracking',
        'Secure payment integration',
        'Dynamic booking management system'
      ]
    },
    {
      id: 'community',
      title: 'Sustainable Community Management System',
      description: 'A system built using Node.js, Express.js, React.js, and MongoDB. Features include responsive design with Tailwind CSS, real-time data management, and state handling using Redux.',
      icon: <Calendar size={24} />,
      tech: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'Tailwind CSS', 'Redux'],
      color: 'from-green-500 to-teal-600',
      features: [
        'Community event scheduling and management',
        'Resource allocation and tracking',
        'Interactive data visualization dashboards',
        'Responsive design for mobile and desktop use'
      ]
    },
    {
      id: 'hotel',
      title: 'Hotel Management System',
      description: 'A comprehensive hotel management platform leveraging MERN stack and machine learning for intelligent room pricing and reservation management.',
      icon: <Hotel size={24} />,
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Machine Learning', 'Redux'],
      color: 'from-red-500 to-pink-600',
      features: [
        'AI-driven dynamic room pricing',
        'Real-time room reservation & availability tracking',
        'Advanced guest registration system',
        'Comprehensive billing and payment integration',
        'Interactive admin and guest dashboards',
        'Data visualization with predictive analytics'
      ],
      status: 'Ongoing'
    }
  ];

  const handleProjectHover = (id: string | null) => {
    setActiveProject(id);
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="min-h-screen py-16 bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative overflow-hidden"
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
            My Projects
          </span>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4"></div>
        </h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Project cards */}
          <div className="grid gap-8 mb-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={() => handleProjectHover(null)}
              >
                <div className={`bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-${project.color.split(' ')[0]}/20 relative group`}>
                  {/* Status badge for ongoing projects */}
                  {project.status && (
                    <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      {project.status}
                    </div>
                  )}
                  
                  {/* Animated left border */}
                  <div 
                    className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${project.color} transition-all duration-500`}
                    style={{ 
                      height: activeProject === project.id ? '100%' : '30%',
                      opacity: activeProject === project.id ? 1 : 0.7
                    }}
                  ></div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex items-start">
                      {/* Project icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg mr-4 flex items-center justify-center bg-gradient-to-br ${project.color} shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        {project.icon}
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                          {project.title}
                        </h3>
                        <p className="text-white/80 mb-6">
                          {project.description}
                        </p>
                        
                        {/* Project details - appears on hover */}
                        <div className={`space-y-4 transition-all duration-500 ${activeProject === project.id ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'} overflow-hidden`}>
                          <div>
                            <h4 className="text-sm uppercase tracking-wider text-white/60 mb-2">Key Features</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <ChevronRight size={18} className="mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                                  <span className="text-white/80">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tech.map((tech, i) => (
                            <span 
                              key={i} 
                              className={`inline-block text-xs px-3 py-1 rounded-full bg-white/10 text-white/90 transition-all duration-300 hover:bg-gradient-to-r ${project.color}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* GitHub link */}
          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <a 
              href="https://github.com/U-WarlockX" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-full transition-all duration-300 group"
            >
              <Github size={20} className="mr-2" />
              <span>See more projects on GitHub</span>
              <ExternalLink size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;