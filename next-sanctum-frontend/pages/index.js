import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // ✅ Add this
import { Lock, Shield, Users, Zap, ArrowRight, Sparkles, Star, CheckCircle } from 'lucide-react';

export default function AuthHomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
   const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${10 + mousePosition.y * 0.02}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            right: `${10 + (100 - mousePosition.x) * 0.03}%`,
            bottom: `${20 + (100 - mousePosition.y) * 0.03}%`,
            transform: 'translate(50%, 50%)'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-teal-500/25 to-green-500/25 rounded-full blur-2xl animate-bounce"
          style={{
            left: `${60 + mousePosition.x * 0.01}%`,
            top: `${40 + mousePosition.y * 0.01}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 transition-all duration-500 ease-out opacity-30 blur-sm"
        style={{
          left: `calc(${mousePosition.x}% - 12px)`,
          top: `calc(${mousePosition.y}% - 12px)`,
        }}
      />

      <div className="relative z-10 min-h-screen">
        
        {/* Header Section */}
        <header className="pt-6 pb-4 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <Shield className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white drop-shadow-lg">SecureAuth</h1>
                    <p className="text-purple-200 text-sm">Next-Gen Authentication</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-6 py-2 text-white/80 hover:text-white transition-all duration-300 font-medium">
                    Features
                  </button>
                  <button className="px-6 py-2 text-white/80 hover:text-white transition-all duration-300 font-medium">
                    Pricing
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={handleLogin}>
                    Login
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20" onClick={handleRegister}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="glass-card p-12 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 mb-12">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-semibold bg-yellow-400/20 px-4 py-2 rounded-full">
                  Revolutionary Security Platform
                </span>
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Secure Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
                  {" "}Digital Future
                </span>
              </h2>
              
              <p className="text-xl lg:text-2xl text-purple-100 mb-10 max-w-4xl mx-auto leading-relaxed">
                Experience the next generation of authentication with military-grade security, 
                seamless user experience, and cutting-edge technology that adapts to your needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3" onClick={handleRegister}>
                  <span className="text-lg">Get Started Free</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="group hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">50M+</div>
                  <div className="text-purple-200 font-medium">Users Protected</div>
                </div>
                <div className="group hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">99.99%</div>
                  <div className="text-purple-200 font-medium">Uptime SLA</div>
                </div>
                <div className="group hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">200+</div>
                  <div className="text-purple-200 font-medium">Countries</div>
                </div>
                <div className="group hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">24/7</div>
                  <div className="text-purple-200 font-medium">Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">SecureAuth?</span>
              </h3>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Discover the advanced features that make us the most trusted authentication platform worldwide.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 group hover:bg-white/15 transition-all duration-500 hover:scale-105">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Military-Grade Encryption</h4>
                <p className="text-purple-200 text-lg leading-relaxed mb-6">
                  Advanced AES-256 encryption with quantum-resistant algorithms ensures your data remains secure against future threats.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">End-to-end encryption</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">Zero-knowledge architecture</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">Quantum-resistant security</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 group hover:bg-white/15 transition-all duration-500 hover:scale-105">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Lightning Fast Performance</h4>
                <p className="text-purple-200 text-lg leading-relaxed mb-6">
                  Experience sub-second authentication with our globally distributed infrastructure and optimized algorithms.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">Global edge network</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">Optimized algorithms</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">Real-time processing</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 group hover:bg-white/15 transition-all duration-500 hover:scale-105">
                <div className="p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Multi-Factor Authentication</h4>
                <p className="text-purple-200 text-lg leading-relaxed mb-6">
                  Comprehensive security layers including biometrics, SMS, email, and hardware tokens for ultimate protection.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">Biometric authentication</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">Hardware token support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">Adaptive security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-12 rounded-3xl backdrop-blur-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 text-center">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-yellow-400 font-semibold ml-2">Trusted by millions</span>
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Secure Your Future?
              </h3>
              
              <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
                Join millions of users who trust SecureAuth to protect their digital lives. 
                Start your free trial today and experience the difference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3" onClick={handleRegister}>
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <button className="px-10 py-5 bg-white/10 text-white font-bold text-xl rounded-2xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">SecureAuth</h4>
                    <p className="text-purple-200 text-sm">© 2025 All rights reserved</p>
                  </div>
                </div>
                <div className="flex space-x-8">
                  <a href="#" className="text-purple-200 hover:text-white transition-colors font-medium">Privacy</a>
                  <a href="#" className="text-purple-200 hover:text-white transition-colors font-medium">Terms</a>
                  <a href="#" className="text-purple-200 hover:text-white transition-colors font-medium">Support</a>
                  <a href="#" className="text-purple-200 hover:text-white transition-colors font-medium">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>

      <style jsx>{`
        .glass-card {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>
    </div>
  );
}