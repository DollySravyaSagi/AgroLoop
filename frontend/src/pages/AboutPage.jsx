import React from 'react';
import { Target, Eye, ShieldCheck, Leaf, Heart, Users, Award, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ImpactCounter from '../components/common/ImpactCounter';

export default function AboutPage() {
  const { setActiveTab } = useApp();

  const comparison = [
    { feature: "Environmental Impact", traditional: "Releases severe PM2.5 & toxic carbon smoke", agroloop: "Zero burning; 100% biomass recycled" },
    { feature: "Soil Health", traditional: "Destroys topsoil microbial flora & nutrients", agroloop: "Restores soil carbon via organic compost" },
    { feature: "Farmer Revenue", traditional: "Costs money to clear fields manually", agroloop: "Free pickup + Earn Eco-Points & rewards" },
    { feature: "Air Quality (AQI)", traditional: "Causes severe winter smog (AQI 400+)", agroloop: "Keeps regional air clean and breathable" },
    { feature: "Economic Value", traditional: "Biomass completely wasted", agroloop: "Generates high-grade NPK bio-fertilizer" }
  ];

  const team = [
    { name: "Dr. Vikramaditya Sen", role: "Co-Founder & Chief Agronomist", bio: "Ex-ICAR Senior Scientist with 20+ years expertise in soil microbial decomposers.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" },
    { name: "Siddharth Verma", role: "CEO & Logistics Director", bio: "Supply chain innovator specializing in rural biomass transport networks.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" },
    { name: "Dr. Ananya Sharma", role: "Chief Environmental Officer", bio: "Environmental policy strategist focused on agricultural carbon offsets.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80" },
    { name: "Gurpreet Dhillon", role: "Head of Community & Farmer Relations", bio: "Lead community organizer connecting over 12,000+ farmers across Punjab & Haryana.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center rounded-3xl max-w-7xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-700/80 border border-emerald-500/80 text-emerald-200">
          About AgroLoop Initiative
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto">
          Pioneering Sustainable Agricultural Waste Management in India
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          We are dedicated to eradicating crop residue burning through smart technology, localized transport logistics, and eco-friendly bio-composting.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To provide every Indian farmer with an accessible, free, and reliable digital channel to dispose of crop residues without resort to field burning, while empowering local biomass transport operators and producing high-grade organic fertilizers.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A zero-burning, zero-smog agricultural landscape where agricultural waste is recognized as a vital organic asset that revitalizes soil health and drives a thriving circular bio-economy.
          </p>
        </div>

      </section>

      {/* Environmental Impact Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-black text-center text-slate-900 dark:text-white">
          Measurable Environmental Progress
        </h2>
        <ImpactCounter />
      </section>

      {/* Comparative Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Traditional Burning vs. AgroLoop Circular Model
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            See how AgroLoop transforms agricultural practice across every critical metric.
          </p>
        </div>

        <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                <th className="p-4 sm:p-5">Metric / Feature</th>
                <th className="p-4 sm:p-5 text-red-600 dark:text-red-400">Traditional Crop Burning</th>
                <th className="p-4 sm:p-5 text-emerald-600 dark:text-emerald-400">AgroLoop Smart Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{row.agroloop}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Our Agronomy & Leadership Team</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Experts combining agricultural science, logistics technology, and environmental policy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center space-y-3">
              <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-emerald-500 shadow-md" />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{member.name}</h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{member.role}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
