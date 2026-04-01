import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Mail, Phone, Linkedin, Github, MapPin, Clock, Zap } from 'lucide-react';

const Contact = () => {
  const contactChannels = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'hewageuvindu@gmail.com',
      href: 'mailto:hewageuvindu@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Get a response within 24 hours',
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone Call',
      value: '+94 71 945 6781',
      href: 'tel:+94719456781',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Available for quick calls',
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      value: 'Uvindu Hewage',
      href: 'https://www.linkedin.com/in/uvindu-hewage-89159a308/',
      gradient: 'from-blue-600 to-blue-700',
      description: 'Connect professionally',
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      value: 'UvinduHewage',
      href: 'https://github.com/UvinduHewage',
      gradient: 'from-purple-600 to-pink-600',
      description: 'Check out my projects',
    },
  ];

  const infoCards = [
    {
      icon: <MapPin size={20} className="text-blue-500" />,
      title: 'Location',
      value: 'Sri Lanka',
    },
    {
      icon: <Clock size={20} className="text-green-500" />,
      title: 'Response Time',
      value: '24-48 hours',
    },
    {
      icon: <Zap size={20} className="text-yellow-500" />,
      title: 'Status',
      value: 'Available for Projects',
    },
  ];

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

  return (
    <section id="contact" className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground/60 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Whether you have a project idea, want to collaborate, or just want to say hello—I'm always excited to connect with talented people. Reach out through any channel that works best for you.
          </p>
        </motion.div>

        {/* Contact Channels Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactChannels.map((channel, idx) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              target={channel.label !== 'Email' && channel.label !== 'Phone Call' ? '_blank' : undefined}
              rel={channel.label !== 'Email' && channel.label !== 'Phone Call' ? 'noreferrer' : undefined}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full group cursor-pointer overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <div className={`h-1 bg-gradient-to-r ${channel.gradient}`} />
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <motion.div
                      className={`w-11 h-11 rounded-lg bg-gradient-to-br ${channel.gradient} flex items-center justify-center text-white mb-3.5`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {channel.icon}
                    </motion.div>
                    <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors leading-tight">
                      {channel.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed min-h-[2.5rem]">
                      {channel.description}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground text-sm break-words leading-tight">
                    {channel.value}
                  </p>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {infoCards.map((info, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/50">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-2.5">
                  <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground leading-tight">{info.title}</p>
                    <p className="font-semibold text-foreground text-sm mt-1 leading-tight">{info.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm actively looking for new opportunities. Let's discuss how I can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap items-center">
            <Button
              asChild
              size="lg"
              className="gap-2.5 text-base px-7"
            >
              <a href="mailto:hewageuvindu@gmail.com" className="inline-flex items-center justify-center gap-2.5 leading-none">
                <Mail size={19} />
                Send Me an Email
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2.5 text-base px-7"
            >
              <a href="tel:+94719456781" className="inline-flex items-center justify-center gap-2.5 leading-none">
                <Phone size={19} />
                Call Me
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2.5 text-base px-7"
            >
              <a href="https://www.linkedin.com/in/uvindu-hewage-89159a308/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2.5 leading-none">
                <Linkedin size={19} />
                LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>

        {/* CTA Footer */}
        <motion.div
          variants={itemVariants}
          className="text-center pt-8 border-t border-border/50"
        >
          <p className="text-muted-foreground mb-4">
            Looking forward to connecting with you. Let's create something amazing!
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;