import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Lock, Shield, Mail, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      await login(email, password);
    } catch (err) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden p-5">
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

      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 transition-all duration-500 ease-out opacity-30 blur-sm"
        style={{
          left: `calc(${mousePosition.x}% - 12px)`,
          top: `calc(${mousePosition.y}% - 12px)`,
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Shield className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">SecureAuth</h1>
                <p className="text-purple-200 text-sm">Next-Gen Authentication</p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="glass-card p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-semibold bg-yellow-400/20 px-3 py-1 rounded-full text-sm">
                  Welcome Back
                </span>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-purple-200">Access your secure dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl backdrop-blur-sm">
                <p className="text-red-200 text-center font-medium">{error}</p>
              </div>
            )}

            <div onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-purple-300" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-purple-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-purple-200">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-500 bg-white/10 border border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="group w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3"
              >
                <span className="text-lg">Sign In</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-purple-200">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="text-purple-300 hover:text-white font-semibold transition-colors duration-300 underline decoration-purple-300 hover:decoration-white"
                >
                  Register
                </a>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-purple-300 hover:text-white transition-colors duration-300 font-medium inline-flex items-center space-x-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Home</span>
            </a>
          </div>
        </div>
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