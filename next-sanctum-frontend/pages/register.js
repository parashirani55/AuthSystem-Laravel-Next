import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Lock, Shield, Mail, Eye, EyeOff, ArrowRight, Sparkles, User, CheckCircle } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { register, user } = useContext(AuthContext);
  const router = useRouter();

  // Redirect after login
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
    setError(null); // Clear previous error
    try {
      await register(name, email, password, passwordConfirmation);
    } catch (err) {
      setError(err?.message || 'Registration failed');
    }
  };

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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
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

          {/* Register Form */}
          <div className="glass-card p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-semibold bg-yellow-400/20 px-3 py-1 rounded-full text-sm">
                  Join SecureAuth
                </span>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-purple-200">Start your secure journey today</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl backdrop-blur-sm">
                <p className="text-red-200 text-center font-medium">{error}</p>
              </div>
            )}

            <div onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-purple-300" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
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

              <div>
                <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CheckCircle className="w-5 h-5 text-purple-300" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-white transition-colors duration-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 text-sm">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 text-purple-500 bg-white/10 border border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-purple-200 leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300 underline">
                    Privacy Policy
                  </a>
                </span>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="group w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3"
              >
                <span className="text-lg">Create Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-purple-200">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-purple-300 hover:text-white font-semibold transition-colors duration-300 underline decoration-purple-300 hover:decoration-white"
                >
                  Login
                </a>
              </p>
            </div>

            {/* Security Features */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-purple-200 text-sm mb-4 font-medium">Your account will be protected with:</p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center space-x-2 text-purple-200">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>256-bit encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-200">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Two-factor auth</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-200">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Secure cloud storage</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-200">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>24/7 monitoring</span>
                </div>
              </div>
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