import React, { useEffect, useState } from 'react';

const Background = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for dark mode preference
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Main gradient background */}
      <div className="fixed inset-0 z-0">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

        {/* Animated gradient overlay - Dark mode */}
        {isDark && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/5 to-primary/20 animate-gradient-shift" />
        )}

        {/* Animated gradient overlay - Light mode */}
        {!isDark && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-purple-50/60 to-blue-50/80 animate-gradient-shift" />
        )}

        {/* Colorful accent blobs - dark mode */}
        {isDark && (
          <>
            <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-blob-delayed" />
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-blob-slow" />
            <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '1.5s' }} />
          </>
        )}

        {/* Colorful accent blobs - light mode with vibrant colors */}
        {!isDark && (
          <>
            <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-400/45 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-40 -right-40 w-80 h-80 bg-purple-400/45 rounded-full blur-3xl animate-blob-delayed" />
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-400/40 rounded-full blur-3xl animate-blob-slow" />
            <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-indigo-400/40 rounded-full blur-3xl animate-blob" style={{ animationDelay: '1.5s' }} />
          </>
        )}

        {/* Grid pattern overlay - more visible in light mode */}
        <div className={isDark ? 'absolute inset-0 opacity-30 dark:opacity-20' : 'absolute inset-0 opacity-30'}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, ${isDark ? '0.15' : '0.14'}) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, ${isDark ? '0.15' : '0.14'}) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              backgroundPosition: '0 0',
            }}
          />
        </div>

        {/* Radial gradient center - different for light and dark */}
        {isDark && <div className="absolute inset-0 bg-radial-gradient opacity-60" />}
        {!isDark && <div className="absolute inset-0 bg-radial-gradient-light opacity-40" />}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full">
        {children}
      </div>

      {/* Styles */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
            opacity: 0.5;
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
            opacity: 0.6;
          }
        }

        @keyframes blob-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          33% {
            transform: translate(-30px, 50px) scale(0.95);
            opacity: 0.5;
          }
          66% {
            transform: translate(20px, -20px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes blob-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(20px, 30px) scale(1.05);
            opacity: 0.4;
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 9s ease-in-out infinite;
        }

        .animate-blob-delayed {
          animation: blob-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-blob-slow {
          animation: blob-slow 12s ease-in-out infinite;
          animation-delay: 1s;
        }

        .bg-radial-gradient {
          background: radial-gradient(circle at 50% 50%, 
            rgba(var(--primary-rgb, 59, 130, 246), 0.25) 0%, 
            rgba(var(--background), 0) 70%
          );
        }

        .bg-radial-gradient-light {
          background: radial-gradient(circle at 50% 50%, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(255, 255, 255, 0) 70%
          );
        }

        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-shift,
          .animate-blob,
          .animate-blob-delayed,
          .animate-blob-slow {
            animation: none !important;
            opacity: 0.4 !important;
          }
        }

        /* Subtle grid pattern - CSS only for better performance */
        @media (max-width: 768px) {
          [style*="backgroundImage"] {
            background-size: 40px 40px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Background;