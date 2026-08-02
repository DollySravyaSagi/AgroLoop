import React, { useState } from 'react';
import { User, Truck, Factory, Shield, CheckCircle2, Lock, Mail, Phone, MapPin, Building, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RegisterPage() {
  const { setActiveTab, registerUser, setUser, showToast } = useApp();
  const [roleTab, setRoleTab] = useState('farmer');

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    address: '',
    village: '',
    district: 'Ludhiana',
    state: 'Punjab',
    // Collector specific
    company: '',
    vehicleNumber: '',
    vehicleCapacity: '10 Tons',
    // Compost specific
    plantName: '',
    capacityPerDay: '30 Tons/Day'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email) {
      showToast('Please fill in required fields (Name, Mobile, Email)', 'warning');
      return;
    }

    const newAccount = {
      id: `usr_${roleTab}_${Date.now()}`,
      name: formData.name,
      role: roleTab,
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile,
      village: formData.village || 'Ludhiana Village',
      district: formData.district || 'Ludhiana',
      state: formData.state || 'Punjab',
      address: formData.address || `${formData.village}, ${formData.district}`,
      company: formData.company,
      vehicleNumber: formData.vehicleNumber,
      plantName: formData.plantName
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: roleTab })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          registerUser({ ...newAccount, ...data.user });
          showToast(`Registration Successful! Welcome to AgroLoop, ${data.user.name}.`, 'success');
          if (roleTab === 'farmer') setActiveTab('farmer-dashboard');
          else if (roleTab === 'collector') setActiveTab('collector-dashboard');
          else setActiveTab('compost-dashboard');
          return;
        }
      }
    } catch (err) {
      console.log('Backend API offline, completing client registration');
    }

    registerUser(newAccount);
    showToast(`Registration Successful! Welcome to AgroLoop, ${formData.name}.`, 'success');

    if (roleTab === 'farmer') setActiveTab('farmer-dashboard');
    else if (roleTab === 'collector') setActiveTab('collector-dashboard');
    else setActiveTab('compost-dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
          Join the AgroLoop Movement
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Create Your Account</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Select your user role to register on India's smart agricultural waste management platform.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-slate-200 dark:bg-slate-800 p-1.5 rounded-2xl mb-8">
        <button
          type="button"
          onClick={() => setRoleTab('farmer')}
          className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            roleTab === 'farmer'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Farmer</span>
        </button>

        <button
          type="button"
          onClick={() => setRoleTab('collector')}
          className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            roleTab === 'collector'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Collector</span>
        </button>

        <button
          type="button"
          onClick={() => setRoleTab('compost_unit')}
          className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            roleTab === 'compost_unit'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>Compost Plant</span>
        </button>
      </div>

      {/* Main Registration Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
            {roleTab === 'farmer' && <User className="w-5 h-5 text-emerald-600" />}
            {roleTab === 'collector' && <Truck className="w-5 h-5 text-blue-600" />}
            {roleTab === 'compost_unit' && <Factory className="w-5 h-5 text-amber-600" />}
            <span>{roleTab.replace('_', ' ')} Registration Details</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Gurpreet Singh"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+91 98000 00000"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password *</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Role specific fields */}
          {roleTab === 'collector' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Company / Fleet Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="GreenTrans Express"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="PB-10-CZ-8842"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Vehicle Capacity</label>
                <select
                  name="vehicleCapacity"
                  value={formData.vehicleCapacity}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                >
                  <option>5 Tons Tipper</option>
                  <option>10 Tons Hydraulic Lorry</option>
                  <option>15 Tons Tractor Trailer</option>
                  <option>20+ Tons Multi-Axle</option>
                </select>
              </div>
            </div>
          )}

          {roleTab === 'compost_unit' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-amber-50/50 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-100 dark:border-amber-900">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Compost Plant Name</label>
                <input
                  type="text"
                  name="plantName"
                  value={formData.plantName}
                  onChange={handleChange}
                  placeholder="BioTerra Organic Facility"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Daily Processing Capacity</label>
                <select
                  name="capacityPerDay"
                  value={formData.capacityPerDay}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                >
                  <option>10 - 25 Tons / Day</option>
                  <option>25 - 50 Tons / Day</option>
                  <option>50 - 100 Tons / Day</option>
                  <option>100+ Tons / Day</option>
                </select>
              </div>
            </div>
          )}

          {/* Location details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Village / Town</label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                placeholder="e.g. Ladian"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">District *</label>
              <input
                type="text"
                name="district"
                required
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g. Ludhiana"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">State *</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Punjab"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Field / Farm Road Address..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Complete Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Already have an account?{' '}
            <button onClick={() => setActiveTab('login')} className="font-bold text-emerald-600 hover:underline">
              Log in here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
