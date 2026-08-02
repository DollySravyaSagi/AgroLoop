import React from 'react';
import { Truck, Factory, Recycle, Sprout, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ServicesPage() {
  const { setActiveTab } = useApp();

  const services = [
    {
      id: "waste-collection",
      title: "Waste Collection Service",
      subtitle: "On-Demand Field Biomass Pickup",
      icon: <Truck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      desc: "Farmers can request rapid agricultural waste removal directly from their fields. Our registered transport fleets arrive with hydraulic tippers, balers, and loaders to clear fields cleanly within 48 hours.",
      features: [
        "Covers Paddy Straw, Wheat Stubble, Sugarcane Bagasse & Cotton Stalks",
        "Free on-site field pickup with no heavy equipment charge",
        "Geo-tracked transport lorries with live status timeline",
        "Field baling support for compact storage and transport"
      ],
      actionText: "Request Waste Pickup",
      targetTab: "farmer-dashboard",
      badge: "Popular Service"
    },
    {
      id: "compost-production",
      title: "Compost Production & Processing",
      subtitle: "Converting Waste into Organic Gold",
      icon: <Factory className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      desc: "We route collected biomass into state-of-the-art bio-decomposer composting facilities. Microbial enzyme treatments decompose stubble into nutrient-dense, enriched NPK organic manure.",
      features: [
        "Advanced Pusa Bio-Decomposer microbial inoculation",
        "High nitrogen, phosphorus, and potassium nutrient profile",
        "Weed-seed free and heavy-metal tested quality control",
        "Available for bulk purchase by organic farm cooperatives"
      ],
      actionText: "Explore Compost Supply",
      targetTab: "compost-dashboard",
      badge: "Eco Certified"
    },
    {
      id: "recycling-support",
      title: "Recycling & Bio-Fuel Integration",
      subtitle: "Industrial Biomass Briquetting & Pellets",
      icon: <Recycle className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      desc: "AgroLoop facilitates biomass supply agreements with thermal power plants, bio-ethanol refineries, and industrial boilers to replace coal with eco-friendly compressed crop straw pellets.",
      features: [
        "Biomass briquetting for industrial green energy boilers",
        "2G bio-ethanol refinery feedstock supply agreement",
        "Reduces industrial fossil fuel dependency and carbon tax",
        "Carbon credit documentation and compliance tracking"
      ],
      actionText: "Collector Fleet Access",
      targetTab: "collector-dashboard",
      badge: "Green Energy"
    },
    {
      id: "sustainable-farming",
      title: "Sustainable Farming Assistance",
      subtitle: "Agronomy Advisory & Soil Regeneration",
      icon: <Sprout className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
      desc: "Comprehensive agronomy guidance helping farmers transition to zero-budget natural farming, happy seeder technology, and long-term soil organic carbon enrichment.",
      features: [
        "Free soil organic carbon & pH diagnostic guidance",
        "Happy Seeder & Super Seeder machinery rental connects",
        "Microbial bio-decomposer spray distribution kits",
        "Stubble subsidy application guidance"
      ],
      actionText: "Contact Advisory Team",
      targetTab: "contact",
      badge: "Free Advisory"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">

      {/* Header */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center rounded-3xl max-w-7xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-700/80 border border-emerald-500/80 text-emerald-200">
          Our Comprehensive Offerings
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto">
          End-to-End Smart Agricultural Waste Solutions
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore our range of integrated services designed to connect farmers, haulers, and compost plants while safeguarding the environment.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 w-fit">
                  {svc.icon}
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {svc.badge}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{svc.title}</h2>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{svc.subtitle}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {svc.desc}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Highlights:</h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveTab(svc.targetTab)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{svc.actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </section>

      {/* Trust Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-8 text-center space-y-4">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-2xl font-bold">100% Certified Bio-Decomposer Standards</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            All compost operations managed through AgroLoop comply with ICAR bio-fertilizer quality control guidelines and National Green Tribunal stubble management regulations.
          </p>
        </div>
      </section>

    </div>
  );
}
