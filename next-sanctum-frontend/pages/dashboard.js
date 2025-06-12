import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Shield, User, Mail, LogOut, Settings, Bell, ChevronRight, Activity, Lock, CheckCircle, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user, logout, loading } = useContext(AuthContext);
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <span className="text-white font-semibold text-lg">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting, so don't render
  }

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
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-md bg-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <Shield className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white drop-shadow-lg">SecureAuth</h1>
                  <p className="text-purple-200 text-xs">Dashboard</p>
                </div>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-purple-300 hover:text-white transition-colors duration-300">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-purple-300 hover:text-white transition-colors duration-300">
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-200 rounded-xl hover:bg-red-500/30 transition-all duration-300 border border-red-500/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="glass-card p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                    <span className="text-yellow-400 font-semibold bg-yellow-400/20 px-3 py-1 rounded-full text-sm">
                      Welcome Back
                    </span>
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    Welcome, {user.name}!
                  </h1>
                  <div className="flex items-center space-x-2 text-purple-200">
                    <Mail className="w-4 h-4" />
                    <span>Email: {user.email}</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/20">
                    <User className="w-12 h-12 text-purple-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <ChevronRight className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Account Status</h3>
              <p className="text-green-400 font-semibold">Active & Secure</p>
              <p className="text-purple-200 text-sm mt-1">All systems operational</p>
            </div>

            <div className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <ChevronRight className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Activity</h3>
              <p className="text-blue-400 font-semibold">12 Sessions</p>
              <p className="text-purple-200 text-sm mt-1">Last login: Today</p>
            </div>

            <div className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
                <ChevronRight className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Security Level</h3>
              <p className="text-purple-400 font-semibold">Maximum</p>
              <p className="text-purple-200 text-sm mt-1">2FA enabled</p>
            </div>
          </div>

          {/* Security Features */}
          <div className="glass-card p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <span>Your Security Features</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">256-bit Encryption</h4>
                  <p className="text-purple-200 text-sm">Your data is protected with military-grade encryption</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">Two-Factor Authentication</h4>
                  <p className="text-purple-200 text-sm">Extra layer of security for your account</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">Secure Cloud Storage</h4>
                  <p className="text-purple-200 text-sm">Your files are safely stored in encrypted cloud</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">24/7 Monitoring</h4>
                  <p className="text-purple-200 text-sm">Continuous security monitoring and alerts</p>
                </div>
              </div>
            </div>
          </div>
        </main>
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