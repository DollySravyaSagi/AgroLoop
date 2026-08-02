import React from 'react';
import { Leaf, ArrowRight, Truck, CheckCircle2, Search, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { setActiveTab } = useApp();

  const simpleSteps = [
    {
      num: '1',
      title: 'Request Pickup',
      desc: 'Farmer posts crop stubble location and estimated tons in 30 seconds.',
      icon: <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
    },
    {
      num: '2',
      title: 'Free Field Clearing',
      desc: 'Nearby tractor/tipper collector dispatches and clears your field for free.',
      icon: <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    },
    {
      num: '3',
      title: 'Organic Recycling',
      desc: 'Stubble is delivered to local compost unit and turned into rich organic manure.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl mx-4 sm:mx-8 p-8 sm:p-16 shadow-2xl text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Zero Stubble Burning • 100% Free Service</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Turn Crop Stubble into <br />
            <span className="text-emerald-400">Organic Wealth</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Free agricultural waste pickup service connecting farmers directly with nearby transport fleets and compost plants.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('farmer-dashboard')}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-95"
            >
              <Truck className="w-6 h-6" /> Request Free Pickup
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-7 py-4 rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5 text-emerald-300" /> Track Pickup Status
            </button>
          </div>

        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="max-w-5xl mx-auto px-4 space-y-8 text-center">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            3 Simple Steps to Clear Your Field
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {simpleSteps.map((step) => (
            <div 
              key={step.num}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-3 relative"
            >
              <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-sm flex items-center justify-center">
                {step.num}
              </span>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Short CTA Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black">
            Need Stubble Cleared Today?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
            Post your pickup request now and get a nearby collector assigned to your field.
          </p>
          <button
            onClick={() => setActiveTab('farmer-dashboard')}
            className="bg-white text-emerald-800 font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:bg-emerald-50 transition-all inline-flex items-center gap-2"
          >
            <Leaf className="w-5 h-5 text-emerald-600" /> Start Free Request
          </button>
        </div>
      </section>

    </div>
  );
}
