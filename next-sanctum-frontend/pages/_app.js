import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import { AlertTriangle, X, Shield, Sparkles } from 'lucide-react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (router.query.alert === 'logout-required') {
      setShowAlert(true);
    }
  }, [router.query]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const closeAlert = () => {
    setShowAlert(false);
    // Remove the alert query parameter from URL
    const { alert, ...restQuery } = router.query;
    router.replace({
      pathname: router.pathname,
      query: restQuery,
    }, undefined, { shallow: true });
  };

  return (
    <AuthProvider>
      {/* Alert Overlay */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeAlert} />
          
          {/* Animated Background Elements for Alert */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute w-32 h-32 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full blur-2xl animate-pulse"
              style={{
                left: `${30 + mousePosition.x * 0.01}%`,
                top: `${20 + mousePosition.y * 0.01}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
            <div 
              className="absolute w-24 h-24 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-full blur-xl animate-pulse delay-500"
              style={{
                right: `${20 + (100 - mousePosition.x) * 0.02}%`,
                bottom: `${30 + (100 - mousePosition.y) * 0.02}%`,
                transform: 'translate(50%, 50%)'
              }}
            />
          </div>

          {/* Alert Modal */}
          <div className="relative glass-card p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 max-w-md w-full mx-4 animate-scale-in">
            {/* Close Button */}
            <button
              onClick={closeAlert}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Alert Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg">
                  <AlertTriangle className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">SecureAuth</h1>
                  <p className="text-red-200 text-sm">Authentication Alert</p>
                </div>
              </div>
            </div>

            {/* Alert Content */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-semibold bg-yellow-400/20 px-3 py-1 rounded-full text-sm">
                  Action Required
                </span>
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Logout Required</h2>
              <p className="text-red-200 leading-relaxed">
                Please logout first to access login or register pages. This ensures your account security and prevents session conflicts.
              </p>
            </div>

            {/* Alert Actions */}
            <div className="space-y-4">
              <button
                onClick={closeAlert}
                className="group w-full px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3"
              >
                <span className="text-lg">I Understand</span>
                <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
              
              <button
                onClick={closeAlert}
                className="w-full px-6 py-3 text-white/80 hover:text-white transition-colors duration-300 font-medium"
              >
                Close
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm">
                🔒 This security measure protects your account integrity
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mouse Follower (only show when alert is visible) */}
      {showAlert && (
        <div 
          className="fixed w-4 h-4 bg-gradient-to-r from-red-400 to-orange-400 rounded-full pointer-events-none z-40 transition-all duration-500 ease-out opacity-40 blur-sm"
          style={{
            left: `calc(${mousePosition.x}% - 8px)`,
            top: `calc(${mousePosition.y}% - 8px)`,
          }}
        />
      )}

      <Component {...pageProps} />

      <style jsx>{`
        .glass-card {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </AuthProvider>
  );
}

export default MyApp;