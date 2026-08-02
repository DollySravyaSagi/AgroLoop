import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, Truck, Factory, Leaf, MapPin, User, Phone, Sparkles, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TrackingPage() {
  const { requests, trackingSearchId, setTrackingSearchId, updateRequestStatus, showToast } = useApp();
  const [selectedReqId, setSelectedReqId] = useState(trackingSearchId || 'AGRO-8942');

  const currentReq = requests.find(r => r.id.toLowerCase() === selectedReqId.toLowerCase()) || requests[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingSearchId.trim()) return;
    const found = requests.find(r => r.id.toLowerCase().includes(trackingSearchId.toLowerCase().trim()));
    if (found) {
      setSelectedReqId(found.id);
      showToast(`Tracking request #${found.id}`, 'info');
    } else {
      showToast(`No request found with ID "${trackingSearchId}"`, 'warning');
    }
  };

  const statusList = [
    "Pickup Requested",
    "Collector Assigned",
    "Pickup In Progress",
    "Waste Delivered",
    "Compost Processing",
    "Completed"
  ];

  const getStepIndex = (status) => {
    return statusList.indexOf(status);
  };

  const currentStepIdx = getStepIndex(currentReq.status);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Search Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/80 text-emerald-200 text-xs font-semibold">
          <Truck className="w-4 h-4 text-yellow-300" />
          <span>Real-Time Waste Logistics Tracker</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Track Your Agricultural Waste Pickup
        </h1>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-lg border border-emerald-500/40">
          <Search className="w-5 h-5 text-slate-400 ml-2" />
          <input
            type="text"
            value={trackingSearchId}
            onChange={(e) => setTrackingSearchId(e.target.value)}
            placeholder="Enter Request ID (e.g. AGRO-8942, AGRO-7301)..."
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md"
          >
            Track Status
          </button>
        </form>

        {/* Quick Select Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-slate-300">
          <span className="font-semibold text-slate-400">Sample Requests:</span>
          {requests.map(r => (
            <button
              key={r.id}
              onClick={() => { setSelectedReqId(r.id); setTrackingSearchId(r.id); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                currentReq.id === r.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-slate-300'
              }`}
            >
              #{r.id} ({r.status})
            </button>
          ))}
        </div>
      </div>

      {/* Main Tracking Details Card */}
      {currentReq && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-xl shadow-xs">
                🌱
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Request #{currentReq.id}</h2>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    {currentReq.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Created on {currentReq.createdAt} • Preferred Pickup Date: {currentReq.preferredDate}
                </p>
              </div>
            </div>

            {/* Simulated Advance Status Button for Demo */}
            {currentStepIdx < statusList.length - 1 && (
              <button
                onClick={() => updateRequestStatus(currentReq.id, statusList[currentStepIdx + 1])}
                className="bg-slate-900 dark:bg-slate-800 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Demo: Advance to Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Key Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Crop Residue:</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{currentReq.cropType}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Est. Quantity:</span>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">{currentReq.quantity} Tons</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Field Location:</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{currentReq.village}, {currentReq.district}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Assigned Collector:</span>
              <p className="font-bold text-blue-600 dark:text-blue-400 text-sm mt-0.5">{currentReq.collectorName || 'Assigning...'}</p>
            </div>
          </div>

          {/* Timeline Tracker Visualization */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-3">
              Progress Timeline Tracker
            </h3>

            {/* Desktop Horizontal Line / Mobile Vertical List */}
            <div className="relative">
              
              {/* Timeline Steps */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
                {currentReq.timeline.map((stepItem, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={idx} className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-2 group">
                      
                      {/* Step Node Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all shadow-md ${
                        isDone 
                          ? isCurrent
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 dark:ring-emerald-950 scale-110'
                            : 'bg-emerald-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : (idx + 1)}
                      </div>

                      {/* Step Content */}
                      <div className="space-y-0.5">
                        <h4 className={`text-xs font-bold ${
                          isCurrent ? 'text-emerald-700 dark:text-emerald-400 font-black' : isDone ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                        }`}>
                          {stepItem.step}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono">{stepItem.date}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight hidden md:block mt-1">
                          {stepItem.details}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Field Collector Contact Card */}
          {currentReq.collectorName && (
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{currentReq.collectorName}</h4>
                  <p className="text-slate-500">Vehicle: PB-10-CZ-8842 (10-Ton Tipper Lorry)</p>
                </div>
              </div>

              <a
                href={`tel:${currentReq.farmerMobile}`}
                onClick={(e) => { e.preventDefault(); showToast('Calling Collector Fleet Helpline...', 'info'); }}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Collector Dispatch
              </a>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
