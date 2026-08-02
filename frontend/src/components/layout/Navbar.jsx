import React, { useState } from 'react';
import { Leaf, Sun, Moon, Menu, X, ChevronDown, User, ShieldCheck, Truck, Factory, MessageSquare, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import NotificationDropdown from '../common/NotificationDropdown';

export default function Navbar() {
  const { theme, toggleTheme, activeTab, setActiveTab, user, switchRole } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const mainLinks = [
    { id: 'home', label: 'Home' },
    { id: 'farmer-dashboard', label: 'Request Pickup' },
    { id: 'tracking', label: 'Track Status' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const getDashboardTab = (role) => {
    if (role === 'farmer') return 'farmer-dashboard';
    if (role === 'collector') return 'collector-dashboard';
    if (role === 'compost_unit') return 'compost-dashboard';
    if (role === 'admin') return 'admin-dashboard';
    return 'farmer-dashboard';
  };

  const getRoleBadge = (role) => {
    if (role === 'farmer') return { name: 'Farmer', icon: <Leaf className="w-3.5 h-3.5 text-emerald-600" />, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (role === 'collector') return { name: 'Collector', icon: <Truck className="w-3.5 h-3.5 text-blue-600" />, bg: 'bg-blue-50 text-blue-700 border-blue-200' };
    if (role === 'compost_unit') return { name: 'Compost Plant', icon: <Factory className="w-3.5 h-3.5 text-amber-600" />, bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    if (role === 'admin') return { name: 'Admin', icon: <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />, bg: 'bg-purple-50 text-purple-700 border-purple-200' };
    return { name: 'User', icon: <User className="w-3.5 h-3.5" />, bg: 'bg-slate-100' };
  };

  const currentBadge = getRoleBadge(user?.role);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-emerald-100 dark:border-slate-800 transition-colors shadow-xs">
      {/* Top Eco Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center flex items-center justify-between font-medium">
        <div className="hidden md:flex items-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold">🌱 AgroLoop Mission</span>
          <span>Zero Stubble Burning • 100% Organic Recycling</span>
        </div>
        <div className="mx-auto md:mx-0 flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Helpline: <strong>1800-AGRO-LOOP</strong>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Agro<span className="text-emerald-600 dark:text-emerald-400">Loop</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Smart Waste to Organic Wealth
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/70 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
            {mainLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === link.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-white/60 dark:hover:bg-slate-700/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Tools (Role Switcher, Notifications, Dark Mode, Dashboard Button) */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${currentBadge.bg}`}
                title="Switch User Role Demo"
              >
                {currentBadge.icon}
                <span className="hidden sm:inline">{currentBadge.name}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {isRoleMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsRoleMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-40 p-2 space-y-1 animate-in fade-in zoom-in duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      Demo Role Switcher
                    </div>
                    <button
                      onClick={() => { switchRole('farmer'); setIsRoleMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        user?.role === 'farmer' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">👨‍🌾 Farmer (Ramesh)</span>
                      {user?.role === 'farmer' && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                    </button>
                    <button
                      onClick={() => { switchRole('collector'); setIsRoleMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        user?.role === 'collector' ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">🚚 Waste Collector</span>
                      {user?.role === 'collector' && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                    </button>
                    <button
                      onClick={() => { switchRole('compost_unit'); setIsRoleMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        user?.role === 'compost_unit' ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">🏭 Compost Unit</span>
                      {user?.role === 'compost_unit' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                    </button>
                    <button
                      onClick={() => { switchRole('admin'); setIsRoleMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        user?.role === 'admin' ? 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">🛡️ Platform Admin</span>
                      {user?.role === 'admin' && <span className="w-2 h-2 rounded-full bg-purple-500"></span>}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Notifications Bell */}
            <NotificationDropdown />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>

            {/* Active Dashboard Button */}
            <button
              onClick={() => setActiveTab(getDashboardTab(user?.role))}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              <span>My Dashboard</span>
            </button>

            {/* Auth Buttons if needed */}
            <button
              onClick={() => setActiveTab('login')}
              className="hidden sm:inline-block text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 px-2 py-1"
            >
              Login
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {mainLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); setIsMobileMenuOpen(false); }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${
                  activeTab === link.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { setActiveTab(getDashboardTab(user?.role)); setIsMobileMenuOpen(false); }}
              className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs text-center"
            >
              Open {currentBadge.name} Dashboard
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => { setActiveTab('login'); setIsMobileMenuOpen(false); }}
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold py-2 rounded-xl text-xs text-center"
              >
                Login
              </button>
              <button
                onClick={() => { setActiveTab('register'); setIsMobileMenuOpen(false); }}
                className="flex-1 bg-emerald-100 text-emerald-800 font-bold py-2 rounded-xl text-xs text-center"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
