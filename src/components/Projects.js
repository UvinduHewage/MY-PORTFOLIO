import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Truck, Hotel, Github, ExternalLink, Star, Zap, Building2 } from 'lucide-react';

const Projects = () => {
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
  
  const projects = [
    {
      id: 'cpm-system',
      title: 'CPM System - Comprehensive Project Management Platform',
      description: 'Enterprise-grade web application for managing complex construction and infrastructure projects. Features role-based access control, real-time collaboration, financial monitoring, procurement, compliance tracking, and multi-level reporting dashboards.',
      shortDesc: 'Enterprise project management platform for construction teams',
      icon: <Building2 size={24} />,
      tech: ['Next.js 15', 'React 18', 'Express.js', 'MySQL', 'TailwindCSS', 'ShadCN UI', 'AWS S3'],
      gradient: 'from-cyan-900 to-slate-900',
      status: 'Live',
      github: 'https://github.com/UvinduHewage',
      demo: '#',
      features: [
        'Project & Task Management - Hierarchical task structure with subtasks & daily updates',
        'Team Management - Role-based access control (RBAC) with granular permissions',
        'Financial Dashboard - Excel data uploads, period snapshots & financial tracking',
        'Procurement Management - RFI, vendor management, purchase tracking & letter registry',
        'Issue Tracking - SNAG tracking, NCR, NCO & defect management',
        'Document Management - File uploads, versioning, AWS S3 cloud storage integration'
      ]
    },
    {
      id: 'construction-ai',
      title: 'Smart Construction Intelligence System',
      description: 'AI-powered microservices platform for construction project optimization. Predicts costs, resources, timelines, and material quality using ML models. Team research project with 4 specialized backend services + Flutter frontend.',
      shortDesc: 'AI-driven construction management with cost/resource prediction',
      icon: <Zap size={24} />,
      tech: ['FastAPI', 'Python', 'XGBoost', 'Flutter', 'MongoDB', 'OpenCV', 'Machine Learning'],
      gradient: 'from-amber-900 to-slate-900',
      status: 'Live',
      github: 'https://github.com/UvinduHewage',
      demo: '#',
      features: [
        'Smart Logistics Optimization - Cost & resource prediction (IT22196460)',
        'Material Quality Assessment - Paint/wood analysis with computer vision',
        'Phase Duration Prediction - 7-phase timeline forecasting with XGBoost',
        '3D Site Reconstruction - COLMAP-based progress visualization',
        'Microservices Architecture - 4 independent FastAPI/Flask services',
        'Real-time Dashboard - Cost analytics & resource metrics'
      ]
    },
    {
      id: 'tinkerbell',
      title: 'Tinkerbell Vehicle Rental System',
      description: 'Developed a full-stack rental platform with booking management, user authentication, and vehicle availability checks.',
      shortDesc: 'Complete rental platform with secure booking system',
      icon: <Truck size={24} />,
      tech: ['PHP', 'JavaScript', 'MySQL', 'HTML/CSS'],
      gradient: 'from-blue-900 to-slate-900',
      status: 'Live',
      github: 'https://github.com/UvinduHewage',
      demo: '#',
      features: [
        'Real-time availability tracking',
        'Secure payment integration',
        'Role-based access control',
        'Dynamic booking management'
      ]
    },
    {
      id: 'community',
      title: 'Sustainable Community Management',
      description: 'Full-stack system for community event scheduling with real-time data management and interactive dashboards.',
      shortDesc: 'Community resource management platform',
      icon: <Star size={24} />,
      tech: ['Node.js', 'React.js', 'MongoDB', 'Redux', 'Tailwind CSS'],
      gradient: 'from-green-900 to-slate-900',
      status: 'Live',
      github: 'https://github.com/UvinduHewage',
      demo: '#',
      features: [
        'Event scheduling & management',
        'Resource allocation tracking',
        'Data visualization dashboards',
        'Responsive mobile design'
      ]
    },
    {
      id: 'hotel',
      title: 'Hotel Management System',
      description: 'Comprehensive MERN-based platform with ML-driven dynamic pricing and real-time reservation management.',
      shortDesc: 'AI-powered hotel management platform',
      icon: <Hotel size={24} />,
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Machine Learning'],
      gradient: 'from-purple-900 to-slate-900',
      status: 'In Progress',
      github: 'https://github.com/UvinduHewage',
      demo: '#',
      features: [
        'AI-driven dynamic pricing',
        'Real-time reservations',
        'Guest registration system',
        'Admin & guest dashboards'
      ]
    }
  ];

  const handleProjectHover = (id) => {
    setActiveProject(id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden"
    >
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of recent projects showcasing my skills in full-stack development, system design, and innovative solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              <Card className="h-full overflow-hidden group cursor-pointer relative border border-border/50 hover:border-primary/50 transition-colors duration-300 flex flex-col">
                {/* Gradient Cover */}
                <div className={`h-32 md:h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  {/* Animated overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"
                  />
                  
                  {/* Icon circle */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white/80">
                      {project.icon}
                    </div>
                  </motion.div>

                  {/* Status Badge */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge
                      variant={project.status === 'In Progress' ? 'destructive' : 'success'}
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                  </motion.div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm">
                    {project.shortDesc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Badge variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Features List - Scrollable on hover */}
                  <motion.div
                    className="flex-1 space-y-2 mb-4 overflow-y-auto pr-2"
                    animate={{
                      maxHeight: activeProject === project.id ? '300px' : '0px',
                      opacity: activeProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Links - Always at bottom */}
                  <div className="flex gap-2 pt-4 border-t border-border/50 mt-auto">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </motion.a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.a
            href="https://github.com/UvinduHewage"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View All Projects on GitHub
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;