import React, { useState } from 'react';
import { ShieldCheck, Users, Truck, Factory, Recycle, BarChart3, PieChart, Check, X, Search, Filter, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { analytics, requests, pendingUsers, approveUser, rejectUser, showToast } = useApp();
  const [adminSearch, setAdminSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filteredRequests = requests.filter(r => 
    r.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
    r.farmerName.toLowerCase().includes(adminSearch.toLowerCase()) ||
    r.district.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/30 border-2 border-purple-400 text-purple-300 flex items-center justify-center font-black text-2xl shadow-md">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black">AgroLoop Central Operations</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/30 text-purple-300 border border-purple-500/50">
                Platform Admin Portal
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              National Stubble Governance • Real-time Monitoring & Verification
            </p>
          </div>
        </div>

        <button 
          onClick={() => showToast('Exporting Platform Governance Report (CSV/PDF)...', 'success')}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-all"
        >
          Export Analytics Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Total Enrolled Farmers</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{analytics.totalFarmers.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +14% this harvest season</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Registered Collectors</span>
            <Truck className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{analytics.totalCollectors.toLocaleString()}</p>
          <span className="text-[10px] text-blue-600 font-bold">Active fleet capacity</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Compost Units</span>
            <Factory className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{analytics.totalCompostUnits.toLocaleString()}</p>
          <span className="text-[10px] text-amber-600 font-bold">ICAR approved facilities</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Total Waste Recycled</span>
            <Recycle className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600">{analytics.totalWasteRecycledTons.toLocaleString()} Tons</p>
          <span className="text-[10px] text-slate-400 font-medium">Prevented stubble burning</span>
        </div>
      </div>

      {/* Analytics Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Waste Recycled Bar Chart Left */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" /> Monthly Agricultural Waste Recycled (Tons)
            </h3>
            <span className="text-xs font-mono text-emerald-600 font-bold">2026 Volume</span>
          </div>

          <div className="h-60 flex items-end justify-between gap-2 pt-6 px-2">
            {analytics.monthlyWasteData.map((d, i) => {
              const maxVal = 45000;
              const heightPct = Math.round((d.wasteTons / maxVal) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-44 flex items-end overflow-hidden">
                    <div 
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-lg group-hover:from-emerald-600 group-hover:to-green-400 transition-all relative"
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {d.wasteTons} T
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Waste Type Breakdown Right */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <PieChart className="w-5 h-5 text-purple-600" /> Waste Type Share
          </h3>

          <div className="space-y-3 pt-2">
            {analytics.wasteTypeBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{item.type}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{item.percentage}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }} 
                    className="h-full rounded-full transition-all duration-500"
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
            <p>• Paddy straw accounts for highest volume during Oct-Nov harvest season.</p>
            <p>• Sugarcane residue increases steadily during winter crushing season.</p>
          </div>
        </div>

      </div>

      {/* Pending User Approval Manager */}
      {pendingUsers.length > 0 && (
        <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" /> Pending Fleet & Plant Registrations ({pendingUsers.length})
            </h3>
            <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">
              Requires Admin Approval
            </span>
          </div>

          <div className="space-y-3">
            {pendingUsers.map((u) => (
              <div key={u.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</h4>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                      {u.role}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{u.details} • {u.district}, {u.state}</p>
                  <p className="text-slate-400 text-[10px]">Applied at: {u.appliedAt}</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => approveUser(u.id)}
                    className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => rejectUser(u.id)}
                    className="flex-1 sm:flex-none bg-red-100 text-red-700 hover:bg-red-200 font-bold text-xs px-4 py-2 rounded-xl flex items-center justify-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Request Overseer Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Global Platform Request Overseer</h3>
            <p className="text-xs text-slate-500">Monitor all waste pickup requests across India in real-time</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="Search ID, farmer or district..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                <th className="p-3.5">Req ID</th>
                <th className="p-3.5">Farmer Name</th>
                <th className="p-3.5">Residue & Volume</th>
                <th className="p-3.5">District</th>
                <th className="p-3.5">Assigned Collector</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-purple-600">#{req.id}</td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{req.farmerName}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{req.cropType} ({req.quantity} Tons)</td>
                  <td className="p-3.5 font-medium">{req.district}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{req.collectorName || 'Unassigned'}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
