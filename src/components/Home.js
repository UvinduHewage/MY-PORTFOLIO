import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.png';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const typingTexts = useMemo(() => [
    'Full-Stack Developer',
    'Data Analytics Enthusiast',
    'Software Engineering Student'
  ], []);
  
  // Typing effect
  useEffect(() => {
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
  }, [typedText, isTyping, currentTextIndex, typingTexts]);
  
  const scrollToNextSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const techStack = [
    { name: 'React.js', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Java', icon: '☕' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'MySQL', icon: '🗄️' },
  ];

  // Import Feather icon for Medium if needed
  const FileText = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  );

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-4">
      <motion.div
        className="max-w-4xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Availability Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm"
        >
          <motion.div
            className="w-2.5 h-2.5 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-foreground">Associate Software Engineer @ Fentons IT</span>
        </motion.div>

        {/* Profile Image */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-12">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative inline-block"
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-2 ring-primary/40 ring-offset-4 ring-offset-background shadow-2xl">
              <img
                src={profileImage}
                alt="Uvindu Hewage - Software Engineering Student"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400';
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Name with Gradient */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent break-words leading-tight px-2">
            Uvindu Hewage
          </h1>
        </motion.div>
              
        {/* Typing Effect */}
        <motion.div variants={itemVariants} className="mb-10 min-h-16 sm:min-h-20 md:min-h-24 flex items-center justify-center px-2">
          <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground flex flex-wrap justify-center items-center gap-2">
            <span className="text-muted-foreground">I'm a</span>
            <span className="text-primary font-bold whitespace-nowrap relative inline-block">
              {typedText}
              <motion.span
                className="absolute w-1 bg-primary"
                style={{ 
                  height: '1.2em',
                  right: typedText ? '-4px' : '-2px'
                }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </div>
        </motion.div>
              
        {/* Tech Stack Pills */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full border border-border bg-secondary/50 text-secondary-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              <span className="mr-2">{tech.icon}</span>
              {tech.name}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToNextSection('projects')}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/UUMHewage_CV.pdf';
              link.download = 'UUMHewage_CV.pdf';
              link.click();
            }}
            className="px-8 py-3 rounded-lg border border-border bg-background hover:bg-accent text-foreground font-semibold transition-colors"
          >
            Download CV
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-12 md:mb-16">
          {[
            {
              Icon: Mail,
              href: 'mailto:uvindu.hewage@example.com',
              label: 'Email',
              color: 'hover:text-primary',
            },
            {
              Icon: Phone,
              href: 'tel:+94712345678',
              label: 'Phone',
              color: 'hover:text-primary',
            },
            {
              Icon: Github,
              href: 'https://github.com/UvinduHewage',
              label: 'GitHub',
              color: 'hover:text-primary',
            },
            {
              Icon: Linkedin,
              href: 'https://www.linkedin.com/in/uvindu-hewage-89159a308/',
              label: 'LinkedIn',
              color: 'hover:text-primary',
            },
            {
              Icon: FileText,
              href: 'https://medium.com/@hewageuvindu',
              label: 'Medium',
              color: 'hover:text-primary',
            },
          ].map(({ Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== 'Email' && label !== 'Phone' ? '_blank' : undefined}
              rel={label !== 'Email' && label !== 'Phone' ? 'noreferrer' : undefined}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-full border border-border hover:border-primary ${color} transition-colors`}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          variants={itemVariants}
          onClick={() => scrollToNextSection('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full border border-border hover:border-primary hover:bg-accent/50 transition-colors"
          aria-label="Scroll to next section"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Home;