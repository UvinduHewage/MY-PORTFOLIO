import React from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './components/Background';

function App() {
  return (
    <div className="App bg-black">
      <Background>
        <div className="app-content">
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </Background>
    </div>
  );
}

export default App;