import React, { useState } from 'react';
import { Factory, Sparkles, CheckCircle2, FlaskConical, PackageCheck, Recycle, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CompostUnitDashboard() {
  const { user, requests, updateRequestStatus, showToast } = useApp();
  const [qualityGrade, setQualityGrade] = useState('Grade A - High Carbon Nitrogen Ratio');

  const incomingRequests = requests.filter(r => r.status === 'Waste Delivered' || r.status === 'Pickup In Progress');
  const processingRequests = requests.filter(r => r.status === 'Compost Processing');
  const completedCompostRequests = requests.filter(r => r.status === 'Completed');

  const activeBatches = [
    { id: "BATCH-C408", sourceReq: "AGRO-5110", crop: "Paddy Straw", weight: "8.0 Tons", stage: "Stage 3: Aerobic Windrow Composting", daysLeft: "4 Days", status: "Active Fermentation" },
    { id: "BATCH-C409", sourceReq: "AGRO-8942", crop: "Paddy Straw", weight: "6.5 Tons", stage: "Stage 1: Pusa Bio-Decomposer Inoculation", daysLeft: "14 Days", status: "Newly Received" },
    { id: "BATCH-C405", sourceReq: "AGRO-4200", crop: "Sugarcane Bagasse", weight: "15.0 Tons", stage: "Stage 4: Sieve Screening & NPK Fortification", daysLeft: "Ready Today", status: "Ready for Packaging" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Plant Header */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-600/30 border-2 border-amber-400 text-amber-300 flex items-center justify-center font-black text-2xl shadow-md">
            🏭
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black">{user?.plantName || 'BioTerra Organic Compost Plant'}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/30 text-amber-300 border border-amber-500/50">
                ICAR Certified Unit
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              ⚡ Daily Processing Capacity: {user?.capacityPerDay || '50 Tons / Day'} • {user?.district}, {user?.state}
            </p>
          </div>
        </div>

        {/* Processing Stats */}
        <div className="grid grid-cols-3 gap-3 bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400">Incoming Waste</span>
            <p className="text-xl font-black text-amber-400">{incomingRequests.length}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400">Active Batches</span>
            <p className="text-xl font-black text-emerald-400">{activeBatches.length}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400">Total Manure</span>
            <p className="text-xl font-black text-white">{user?.totalCompostProduced || '640 Tons'}</p>
          </div>
        </div>
      </div>

      {/* Incoming Waste & Quality Verification Manager */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-amber-600" /> Delivered Raw Crop Biomass Shipments
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Verify incoming truck deliveries and initiate microbial decomposition</p>
        </div>

        <div className="space-y-4">
          {incomingRequests.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
              No pending unreceived shipments. All biomass loads processed!
            </div>
          ) : (
            incomingRequests.map((req) => (
              <div key={req.id} className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">Shipment #{req.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                      {req.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    <strong>Residue:</strong> {req.cropType} ({req.quantity} Tons) • <strong>Hauler:</strong> {req.collectorName}
                  </p>
                  <p className="text-slate-500">From Farmer {req.farmerName} ({req.village}, {req.district})</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => updateRequestStatus(req.id, 'Compost Processing', 'Inoculated with Pusa bio-decomposer enzymes')}
                    className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <FlaskConical className="w-4 h-4" /> Start Bio-Decomposition Batch
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Batch Fermentation Tracker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-600" /> Active Microbial Composting Batches
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Monitoring C:N ratio, moisture levels, and aerobic windrow decomposition</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
            Pusa Bio-Decomposer Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeBatches.map((batch) => (
            <div key={batch.id} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-600">{batch.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    {batch.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{batch.crop} ({batch.weight})</h3>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{batch.stage}</p>
                <p className="text-[11px] text-slate-400">Completion Estimate: {batch.daysLeft}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => updateRequestStatus(batch.sourceReq, 'Completed', 'Organic Manure certified & ready for agricultural use')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Mark Batch Ready & Packaged
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
