import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from 'next-themes';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './components/Background';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ErrorBoundary>
        <div className="App bg-background">
          <Navbar />
          <Background>
            <div className="app-content">
              <div id="home">
                <Home />
              </div>
              <div id="about">
                <About />
              </div>
              <div id="skills">
                <Skills />
              </div>
              <div id="projects">
                <Projects />
              </div>
              <div id="contact">
                <Contact />
              </div>
            </div>
          </Background>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;