import React from 'react';
import Home from './Home';
import About from './About';

const AppLayout = () => {
  return (
    <div className="bg-black text-white">
      {/* This container creates a continuous flow between pages */}
      <div className="h-[200vh] overflow-hidden relative">
        {/* Home section fills exactly the first viewport */}
        <div className="h-screen">
          <Home />
        </div>
        
        {/* About section starts immediately where Home ends */}
        <div className="h-screen">
          <About />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;