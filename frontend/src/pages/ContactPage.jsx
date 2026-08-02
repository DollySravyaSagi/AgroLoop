import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Map, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    role: 'Farmer',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent! Our support team will reach out within 2 hours.', 'success');
    setFormData({ name: '', email: '', mobile: '', role: 'Farmer', subject: 'General Inquiry', message: '' });
  };

  const hubs = [
    { city: "Ludhiana (Punjab)", address: "GT Road Bio-Transport Hub #4, Doraha", phone: "+91 161 2894000" },
    { city: "Karnal (Haryana)", address: "Industrial Focal Point Phase II, Karnal", phone: "+91 184 2259100" },
    { city: "Meerut (Uttar Pradesh)", address: "Agriculture Bypass Road, Meerut Hub", phone: "+91 121 2640200" },
    { city: "Indore (Madhya Pradesh)", address: "Sanwer Industrial Area, Indore", phone: "+91 731 2980300" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-700/80 border border-emerald-500/80 text-emerald-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-2xl mx-auto">
          Contact AgroLoop Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Have questions about waste pickup, compost distribution, or collector fleet partnerships? We're here 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form Left */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" /> Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Baldev Singh"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+91 98000 00000"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">I am a...</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white"
                >
                  <option>Farmer</option>
                  <option>Waste Collector</option>
                  <option>Compost Producer</option>
                  <option>General Visitor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Message *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your query or message here..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Inquiry
            </button>
          </form>
        </div>

        {/* Contact Info & Map Placeholder Right */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              Direct Contact Details
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Toll-Free Helpline</p>
                  <p className="font-bold text-slate-900 dark:text-white">1800-AGRO-LOOP (1800-247-6566)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Email Address</p>
                  <p className="font-bold text-slate-900 dark:text-white">support@agroloop.in</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Headquarters</p>
                  <p className="font-bold text-slate-900 dark:text-white">AgroLoop Tower, Sector 62, Mohali, Punjab - 160062</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Map className="w-4 h-4 text-emerald-400" /> Regional Collection Hubs Map
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                4 Active Hubs
              </span>
            </div>

            <div className="h-44 bg-emerald-950/60 rounded-2xl border border-emerald-800/60 flex flex-col items-center justify-center p-4 text-center space-y-2 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <MapPin className="w-8 h-8 text-emerald-400 animate-bounce" />
              <p className="text-xs font-bold text-white relative z-10">Interactive Regional Map View</p>
              <p className="text-[11px] text-emerald-200 relative z-10">Hubs active in Ludhiana, Karnal, Meerut & Indore</p>
            </div>

            <div className="space-y-2 divide-y divide-slate-800 text-xs">
              {hubs.map((hub, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between text-slate-300">
                  <div>
                    <h4 className="font-bold text-white text-xs">{hub.city}</h4>
                    <p className="text-[10px] text-slate-400">{hub.address}</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">{hub.phone}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
