import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const Skills = () => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('skills');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      skillCategories.forEach((category) => {
        category.skills.forEach((skill) => {
          const key = `${category.id}-${skill.name}`;
          const timer = setTimeout(() => {
            setAnimatedValues((prev) => ({
              ...prev,
              [key]: skill.proficiency,
            }));
          }, 100);
          return () => clearTimeout(timer);
        });
      });
    }
  }, [isInView]);

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

  const skillCategories = [
    {
      id: 'languages',
      title: 'Languages',
      skills: [
        { name: 'Java', proficiency: 85 },
        { name: 'JavaScript', proficiency: 80 },
        { name: 'Python', proficiency: 70 },
        { name: 'C++', proficiency: 65 },
        { name: 'HTML/CSS', proficiency: 90 },
      ],
    },
    {
      id: 'frameworks',
      title: 'Frameworks',
      skills: [
        { name: 'React', proficiency: 85 },
        { name: 'Next.js', proficiency: 80 },
        { name: 'Spring Boot', proficiency: 75 },
        { name: 'Node.js', proficiency: 75 },
        { name: 'Express', proficiency: 70 },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Tech',
      skills: [
        { name: 'Git', proficiency: 85 },
        { name: 'MySQL', proficiency: 80 },
        { name: 'MongoDB', proficiency: 70 },
        { name: 'Docker', proficiency: 60 },
        { name: 'Figma', proficiency: 65 },
      ],
    },
    {
      id: 'technical',
      title: 'Technical Skills',
      skills: [
        { name: 'OOP', proficiency: 85 },
        { name: 'REST APIs', proficiency: 80 },
        { name: 'Database Design', proficiency: 75 },
        { name: 'Agile', proficiency: 70 },
      ],
    },
    {
      id: 'soft',
      title: 'Soft Skills',
      skills: [
        { name: 'Leadership', proficiency: 90 },
        { name: 'Communication', proficiency: 85 },
        { name: 'Teamwork', proficiency: 90 },
        { name: 'Problem Solving', proficiency: 85 },
      ],
    },
    {
      id: 'ml',
      title: 'Machine Learning & AI',
      skills: [
        { name: 'XGBoost', proficiency: 80 },
        { name: 'Scikit-learn', proficiency: 80 },
        { name: 'PyTorch', proficiency: 75 },
        { name: 'TensorFlow', proficiency: 70 },
      ],
    },
    {
      id: 'ai',
      title: 'AI & Computer Vision',
      skills: [
        { name: 'OpenCV', proficiency: 80 },
        { name: 'Image Processing', proficiency: 78 },
        { name: 'Object Detection', proficiency: 75 },
        { name: 'COLMAP 3D Reconstruction', proficiency: 72 },
      ],
    },
    {
      id: 'nlp',
      title: 'NLP & LLM',
      skills: [
        { name: 'NLP Fundamentals', proficiency: 75 },
        { name: 'Hugging Face', proficiency: 75 },
        { name: 'Text Processing', proficiency: 78 },
        { name: 'LLM Integration', proficiency: 70 },
      ],
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-24 px-4">
      <motion.div
        className="max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Heading */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, categoryIdx) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIdx) => {
                    const key = `${category.id}-${skill.name}`;
                    const currentValue = animatedValues[key] || 0;

                    return (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        transition={{ delay: skillIdx * 0.05 }}
                      >
                        {/* Skill Name and Percentage */}
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <motion.span
                            className="text-xs font-semibold text-primary"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          >
                            {currentValue}%
                          </motion.span>
                        </div>

                        {/* Progress Bar with Color Based on Proficiency */}
                        <div className={`h-2 w-full rounded-full overflow-hidden ${
                          currentValue >= 85 ? 'bg-green-600/30' :
                          currentValue >= 70 ? 'bg-blue-600/30' :
                          currentValue >= 60 ? 'bg-yellow-600/30' :
                          'bg-gray-600/30'
                        }`}>
                          <motion.div
                            className={`h-full rounded-full ${
                              currentValue >= 85 ? 'bg-green-500' :
                              currentValue >= 70 ? 'bg-blue-500' :
                              currentValue >= 60 ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${currentValue}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { label: 'Languages', value: '5+' },
            { label: 'Frameworks', value: '5+' },
            { label: 'Tools', value: '8+' },
            { label: 'Years Experience', value: '1+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 rounded-lg border border-border bg-card"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;