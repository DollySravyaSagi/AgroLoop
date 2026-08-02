import React from 'react';
import { Recycle, CloudOff, Sprout, Users, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ImpactCounter() {
  const { analytics } = useApp();

  const metrics = [
    {
      icon: <Recycle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />,
      value: analytics.totalWasteRecycledTons.toLocaleString(),
      unit: "Tons",
      label: "Agricultural Waste Recycled",
      desc: "Prevented from field burning",
      bg: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800"
    },
    {
      icon: <CloudOff className="w-7 h-7 text-green-600 dark:text-green-400" />,
      value: analytics.co2PreventedTons.toLocaleString(),
      unit: "Tons",
      label: "CO₂ Emissions Prevented",
      desc: "Clean air & smog reduction",
      bg: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800"
    },
    {
      icon: <Sprout className="w-7 h-7 text-amber-600 dark:text-amber-400" />,
      value: analytics.compostProducedTons.toLocaleString(),
      unit: "Tons",
      label: "Organic Compost Produced",
      desc: "Bio-fertilizers generated",
      bg: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800"
    },
    {
      icon: <Users className="w-7 h-7 text-teal-600 dark:text-teal-400" />,
      value: analytics.totalFarmers.toLocaleString(),
      unit: "+",
      label: "Active Farmers Enrolled",
      desc: "Across Punjab, HR, UP & MP",
      bg: "bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((m, i) => (
        <div 
          key={i} 
          className={`p-6 rounded-2xl border shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 ${m.bg}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
              {m.icon}
            </div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-white/70 dark:bg-slate-900/70 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800 flex items-center gap-1">
              <Award className="w-3 h-3" /> Live Impact
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {m.value}
            </span>
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
              {m.unit}
            </span>
          </div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-1">
            {m.label}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {m.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
