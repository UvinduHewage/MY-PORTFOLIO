import React from 'react';
import Background from './Background';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      <Background>
        <div className="min-h-screen w-full">
          {children}
        </div>
      </Background>
    </div>
  );
};

export default Layout;