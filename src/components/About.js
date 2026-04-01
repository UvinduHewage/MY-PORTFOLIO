import React, { useState } from 'react';
import { Trophy, BookOpen, Code, Database, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const About = () => {
  const [activeTab, setActiveTab] = useState('personal');

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

  const tabVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const education = [
    {
      degree: 'BSc (Hons) Information Technology',
      school: 'Sri Lanka Institute of Information Technology (SLIIT)',
      years: '2022 - Present',
      icon: BookOpen,
      details: 'Specializing in Software Engineering with focus on Full-Stack Development',
    },
    {
      degree: 'Advanced Level (A/L)',
      school: 'Royal College Colombo',
      years: '2019 - 2021',
      icon: BookOpen,
      details: 'Physical Science stream with distinction in Mathematics and Chemistry',
    },
  ];

  const leadership = [
    {
      position: 'Assistant Instructor',
      organization: 'Gold Troop Scout Group',
      years: '2020 - Present',
      icon: Trophy,
      details: 'Leading scout training sessions and mentoring young scouts',
    },
    {
      position: 'Patrol Leader',
      organization: 'Hawks Patrol, Scout Movement',
      years: '2018 - 2020',
      icon: Users,
      details: 'Managing team activities and coordinating group initiatives',
    },
  ];

  const experience = [
    {
      position: 'Associate Software Engineer',
      company: 'Fentons Information Technology',
      years: 'Aug 2025 - Present · 9 mos',
      location: '75 Piyadasa Sirisena Mawatha, Colombo 01000 · On-site',
      type: 'Contract',
      description: 'Skilled in building scalable web applications using Next.js, Express.js, and MariaDB. Proficient in database management with HeidiSQL and DBeaver, and creating responsive UIs with Tailwind CSS. Experienced in full-stack development, API integration, and delivering optimized, user-focused solutions.',
      skills: ['Next.js', 'Express.js', 'DBeaver', 'MariaDB', 'Tailwind CSS', 'AWS', 'Amazon S3'],
    },
    {
      position: 'Software Development Intern',
      company: 'Fentons Information Technology',
      years: 'Dec 2024 - Jul 2025 · 8 mos',
      location: '75 Piyadasa Sirisena Mawatha, Colombo 01000 · On-site',
      type: 'Internship',
      description: 'Gained hands-on experience in software development, contributing to application design, coding, and testing projects. Collaborated with development teams while learning programming languages, debugging techniques, and agile development methodologies.',
      skills: ['PHP', 'PHP Frameworks', 'MariaDB', 'DBeaver', 'AWS', 'Amazon S3'],
    },
  ];

  const activities = [
    { name: 'Hawks Patrol Champions', year: '2017', icon: '🏆' },
    { name: 'Swimming Medal - 50m Freestyle', year: '2016', icon: '🏊' },
    { name: 'Swimming Medal - 100m Breaststroke', year: '2015', icon: '🏊' },
    { name: 'Jamboree Participation', year: '2017', icon: '⛺' },
    { name: 'Camporee Excellence Award', year: '2016', icon: '⛺' },
    { name: 'Camporee Participation', year: '2015', icon: '⛺' },
    { name: 'Youth Leadership Workshop', year: '2018', icon: '📚' },
    { name: 'Community Service Award', year: '2017', icon: '🤝' },
  ];

  const skills = [
    { icon: Code, label: 'Code', color: 'text-blue-400' },
    { icon: Database, label: 'Database', color: 'text-purple-400' },
    { icon: Users, label: 'Learning', color: 'text-green-400' },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-24 px-4">
      <motion.div
        className="max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Heading */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">About Me</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-center mb-8 flex-wrap gap-2 h-auto bg-transparent p-0">
              <TabsTrigger value="personal" className="data-[state=active]:bg-primary">
                Personal
              </TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-primary">
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-primary">
                Education
              </TabsTrigger>
              <TabsTrigger value="leadership" className="data-[state=active]:bg-primary">
                Leadership
              </TabsTrigger>
              <TabsTrigger value="activities" className="data-[state=active]:bg-primary">
                Activities
              </TabsTrigger>
            </TabsList>

            {/* Personal Tab */}
            <TabsContent value="personal">
              <motion.div variants={tabVariants} initial="hidden" animate="visible">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4">Uvindu Udakara Magedara Hewage</h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          Associate Software Engineer at Fentons IT with a strong foundation in Full-Stack Development. Currently in my final year at SLIIT, specializing in Software Engineering. Expertise in Next.js, React, Express.js, and MySQL enables me to build scalable, user-centric applications. Demonstrated proficiency in modern web technologies, cloud services (AWS), and database management. Beyond development, I'm passionate about mentoring young leaders as a Scout Leader and continuously expanding my skills in AI/ML and computer vision technologies.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {skills.map((skill) => {
                            const Icon = skill.icon;
                            return (
                              <motion.div
                                key={skill.label}
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                              >
                                <Badge variant="secondary" className="flex items-center gap-2">
                                  <Icon className={`w-4 h-4 ${skill.color}`} />
                                  {skill.label}
                                </Badge>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <motion.div variants={tabVariants} initial="hidden" animate="visible" className="space-y-4">
                {experience.map((exp, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <h4 className="text-lg font-bold">{exp.position}</h4>
                            <p className="text-primary font-semibold">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.location}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{exp.type}</Badge>
                            <Badge variant="outline">{exp.years}</Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <motion.div variants={tabVariants} initial="hidden" animate="visible" className="space-y-4">
                {education.map((edu, idx) => {
                  const Icon = edu.icon;
                  return (
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          {/* Timeline dot and line */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            {idx < education.length - 1 && (
                              <Separator orientation="vertical" className="h-12" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pb-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-lg font-bold">{edu.degree}</h4>
                                <p className="text-muted-foreground">{edu.school}</p>
                              </div>
                              <Badge variant="outline" className="whitespace-nowrap">
                                {edu.years}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{edu.details}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            </TabsContent>

            {/* Leadership Tab */}
            <TabsContent value="leadership">
              <motion.div variants={tabVariants} initial="hidden" animate="visible" className="space-y-4">
                {leadership.map((role, idx) => {
                  const Icon = role.icon;
                  return (
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          {/* Icon */}
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-lg font-bold">{role.position}</h4>
                                <p className="text-muted-foreground">{role.organization}</p>
                              </div>
                              <Badge variant="outline">{role.years}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{role.details}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities">
              <motion.div
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-4"
              >
                {activities.map((activity, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="h-full"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6 flex flex-col h-full">
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-2xl">{activity.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm md:text-base">{activity.name}</h4>
                            <Badge variant="outline" className="text-xs mt-2">
                              {activity.year}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;