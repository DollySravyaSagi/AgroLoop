import React, { useState } from 'react';
import { Truck, MapPin, CheckCircle2, Clock, Phone, AlertCircle, ShieldCheck, ChevronRight, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CollectorDashboard() {
  const { user, requests, acceptRequest, updateRequestStatus, setActiveTab, setTrackingSearchId, showToast } = useApp();
  const [filterDistrict, setFilterDistrict] = useState('all');

  // Available open pickup requests (not yet assigned or assigned to this collector)
  const nearbyRequests = requests.filter(r => 
    (!r.collectorId || r.collectorId === user?.id) &&
    (filterDistrict === 'all' || r.district.toLowerCase() === filterDistrict.toLowerCase())
  );

  const activeJobs = requests.filter(r => r.collectorId === user?.id && r.status !== 'Completed');
  const completedJobs = requests.filter(r => r.collectorId === user?.id && r.status === 'Completed');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Collector Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border-2 border-blue-400 text-blue-300 flex items-center justify-center font-black text-2xl shadow-md">
            🚚
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black">{user?.name || 'GreenTrans Logistics'}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/30 text-blue-300 border border-blue-500/50">
                Verified Fleet Operator
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              🚛 Vehicle: {user?.vehicleNumber || 'PB-10-CZ-8842'} ({user?.vehicleCapacity || '10-Ton Tipper'}) • {user?.district}, {user?.state}
            </p>
          </div>
        </div>

        {/* Fleet Metrics */}
        <div className="grid grid-cols-3 gap-3 bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400">Available Nearby</span>
            <p className="text-xl font-black text-emerald-400">{nearbyRequests.filter(r => !r.collectorId).length}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400">Active Pickups</span>
            <p className="text-xl font-black text-blue-400">{activeJobs.length}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400">Completed</span>
            <p className="text-xl font-black text-white">{completedJobs.length + (user?.completedPickups || 140)}</p>
          </div>
        </div>
      </div>

      {/* Active Accepted Pickups Manager */}
      {activeJobs.length > 0 && (
        <div className="bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" /> Active Route Pickups ({activeJobs.length})
            </h2>
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border">
              Dispatch Action Required
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeJobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Request #{job.id}</h3>
                    <p className="text-xs text-slate-500">{job.farmerName} • 📞 {job.farmerMobile}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                    {job.status}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  <p><strong>Biomass:</strong> {job.cropType} ({job.quantity} Tons)</p>
                  <p><strong>Field Location:</strong> {job.address}, {job.village}, {job.district}</p>
                  <p><strong>Compost Facility:</strong> {job.compostUnitName}</p>
                </div>

                <div className="pt-2 flex gap-2">
                  {job.status === 'Collector Assigned' && (
                    <button
                      onClick={() => updateRequestStatus(job.id, 'Pickup In Progress', 'Driver en-route to field site')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs"
                    >
                      Start En-Route to Field
                    </button>
                  )}

                  {job.status === 'Pickup In Progress' && (
                    <button
                      onClick={() => updateRequestStatus(job.id, 'Waste Delivered', 'Lorry arrived and unloaded at Compost Unit')}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs"
                    >
                      Mark Waste Delivered to Plant
                    </button>
                  )}

                  <button
                    onClick={() => { setTrackingSearchId(job.id); setActiveTab('tracking'); }}
                    className="bg-slate-100 dark:bg-slate-800 font-bold text-xs px-3 py-2.5 rounded-xl"
                  >
                    View Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Nearby Pickup Jobs Feed */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" /> Nearby Farm Pickup Requests
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Accept available crop residue loads in your transport zone</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Filter District:</span>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold"
            >
              <option value="all">All Districts</option>
              <option value="ludhiana">Ludhiana</option>
              <option value="samrala">Samrala</option>
              <option value="sahnewal">Sahnewal</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyRequests.map((req) => (
            <div key={req.id} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-md">
                    #{req.id}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{req.preferredDate}</span>
                </div>

                <img src={req.image} alt={req.cropType} className="w-full h-36 object-cover rounded-xl border" />

                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{req.cropType}</h3>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{req.quantity} Tons Biomass</p>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{req.village}, {req.district}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 italic">"{req.additionalNotes}"</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                {req.collectorId === user?.id ? (
                  <span className="block text-center text-xs font-bold text-blue-600 py-2">
                    ✓ Accepted by You
                  </span>
                ) : (
                  <button
                    onClick={() => acceptRequest(req.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Accept Pickup Job</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
