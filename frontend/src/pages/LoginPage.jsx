import React, { useState } from 'react';
import { User, Truck, Factory, ShieldCheck, Lock, Mail, ArrowRight, CheckSquare, HelpCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { setActiveTab, setUser, loginUser, switchRole, showToast } = useApp();
  const [email, setEmail] = useState('ramesh.farmer@agroloop.in');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          showToast(`Welcome back, ${data.user.name || 'User'}!`, 'success');
          const role = data.user.role;
          if (role === 'collector') setActiveTab('collector-dashboard');
          else if (role === 'compost_unit') setActiveTab('compost-dashboard');
          else if (role === 'admin') setActiveTab('admin-dashboard');
          else setActiveTab('farmer-dashboard');
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      console.log('Backend offline, checking registered accounts...');
    }

    setIsLoading(false);

    // Check registered accounts saved in localStorage
    const success = loginUser(email, password);
    if (success) return;

    // Fallback for demo accounts
    if (email === 'ramesh.farmer@agroloop.in') {
      switchRole('farmer');
    } else if (email.includes('collector') || email === 'green.trans@agroloop.in') {
      switchRole('collector');
    } else if (email.includes('compost') || email.includes('bioterra')) {
      switchRole('compost_unit');
    } else if (email.includes('admin')) {
      switchRole('admin');
    } else {
      showToast(`No registered user found for ${email}. Please register first or click a Demo account button.`, 'warning');
    }
  };

  const handleQuickDemo = (roleKey) => {
    switchRole(roleKey);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    showToast(`Password reset link sent to ${resetEmail || 'your email'}`, 'info');
    setIsForgotModalOpen(false);
    setResetEmail('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      
      <div className="text-center space-y-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Log in to AgroLoop</h1>
        <p className="text-xs text-slate-500">
          Enter your credentials or choose a quick demo account below.
        </p>
      </div>

      {/* Quick Demo Account Selector */}
      <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-4 rounded-2xl mb-6 space-y-2">
        <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider text-center">
          ⚡ One-Click Demo Login
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('farmer')}
            className="bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1.5 justify-center shadow-xs"
          >
            <User className="w-3.5 h-3.5" /> Farmer Demo
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo('collector')}
            className="bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1.5 justify-center shadow-xs"
          >
            <Truck className="w-3.5 h-3.5 text-blue-500" /> Collector Demo
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo('compost_unit')}
            className="bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-amber-600 hover:text-white transition-all flex items-center gap-1.5 justify-center shadow-xs"
          >
            <Factory className="w-3.5 h-3.5 text-amber-500" /> Compost Unit
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo('admin')}
            className="bg-white dark:bg-slate-800 border border-purple-300 dark:border-purple-700 p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-purple-600 hover:text-white transition-all flex items-center gap-1.5 justify-center shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-500" /> Admin Demo
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
          
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@agroloop.in"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-xs font-semibold text-emerald-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Log In Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <button onClick={() => setActiveTab('register')} className="font-bold text-emerald-600 hover:underline">
              Register here
            </button>
          </p>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 max-w-sm w-full rounded-2xl p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reset Password</h3>
            <p className="text-xs text-slate-500">
              Enter your registered email address and we'll send you password recovery instructions.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
