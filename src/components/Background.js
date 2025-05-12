import React from 'react';

const Background = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Grid Background - Fixed position to cover entire page */}
      <div className="fixed inset-0 grid-background">
        <div className="animated-grid"></div>
      </div>
      
      {/* Glow Effect - Fixed position to cover entire page */}
      <div className="fixed inset-0 glow-effect"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen w-full">
        {children}
      </div>
      
      {/* Custom animation CSS */}
      <style jsx>{`
        .grid-background {
          background-color: #000;
          overflow: hidden;
          z-index: 1;
        }
        
        .animated-grid {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridAnimation 20s linear infinite;
        }
        
        .glow-effect {
          background: radial-gradient(circle at center, rgba(0, 212, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 70%);
          opacity: 0.6;
          z-index: 2;
        }
        
        @keyframes gridAnimation {
          0% {
            transform: perspective(500px) rotateX(15deg) translate3d(-5%, -5%, 0);
          }
          100% {
            transform: perspective(500px) rotateX(15deg) translate3d(0, 0, 0);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Background;