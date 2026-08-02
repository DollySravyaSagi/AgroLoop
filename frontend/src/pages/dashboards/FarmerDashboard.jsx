import React, { useState } from 'react';
import { Leaf, PlusCircle, Clock, Truck, CheckCircle2, Award, FileText, Upload, Sparkles, MapPin, Calendar, Image as ImageIcon, ChevronRight, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FarmerDashboard() {
  const { user, requests, createRequest, setActiveTab, setTrackingSearchId, showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('request'); // 'request', 'my-requests', 'profile'

  // Request Form state
  const [cropType, setCropType] = useState('Paddy Straw (Rice Stubble)');
  const [wasteType, setWasteType] = useState('Dry Stubble');
  const [quantity, setQuantity] = useState('5.0');
  const [unit, setUnit] = useState('Tons');
  const [address, setAddress] = useState(user?.address || 'Farm Field #12, Ladian Village');
  const [village, setVillage] = useState(user?.village || 'Ladian');
  const [district, setDistrict] = useState(user?.district || 'Ludhiana');
  const [state, setState] = useState(user?.state || 'Punjab');
  const [preferredDate, setPreferredDate] = useState('2026-07-29');
  const [additionalNotes, setAdditionalNotes] = useState('Field cleared and baled in 50kg bundles.');
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80');

  const farmerRequests = requests.filter(r => r.farmerId === user?.id || r.farmerName === user?.name);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setImagePreview(fakeUrl);
      showToast('Image uploaded successfully!', 'info');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newId = createRequest({
      cropType,
      wasteType,
      quantity,
      unit,
      address,
      village,
      district,
      state,
      preferredDate,
      additionalNotes,
      image: imagePreview
    });

    setActiveSubTab('my-requests');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600/30 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center font-black text-2xl shadow-md">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black">Welcome, {user?.name}!</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-500/50">
                Verified Farmer
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              📍 {user?.village || 'Ladian'}, {user?.district || 'Ludhiana'}, {user?.state || 'Punjab'} • Eco-Impact Leader
            </p>
          </div>
        </div>

        {/* Eco-Points Card */}
        <div className="bg-emerald-950/80 border border-emerald-700/80 p-4 rounded-2xl flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="p-3 rounded-xl bg-emerald-600/30 text-yellow-300">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-300 tracking-wider">Eco-Reward Points</span>
            <h3 className="text-2xl font-black text-white">{user?.ecoPoints || 450} Points</h3>
            <p className="text-[10px] text-slate-300">Saved ~{user?.totalWasteSaved || '28.5 Tons'} biomass</p>
          </div>
          <button 
            onClick={() => showToast('Generating Official Green Farmer Certificate PDF...', 'success')}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs px-3 py-2 rounded-xl transition-all shadow-xs ml-2"
          >
            Certificate PDF
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('request')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'request'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <PlusCircle className="w-4 h-4" /> Request Waste Pickup
        </button>

        <button
          onClick={() => setActiveSubTab('my-requests')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'my-requests'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" /> My Pickup Requests ({farmerRequests.length})
        </button>
      </div>

      {/* Sub-Tab 1: Request Pickup Form */}
      {activeSubTab === 'request' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 max-w-4xl mx-auto">
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" /> New Agricultural Waste Pickup Form
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Fill details for free residue collection from your farm field</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              100% Free Service
            </span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6 text-xs sm:text-sm">
            
            {/* Input 1: Crop Stubble Type */}
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1. Select Stubble Type *</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '🌾 Paddy (Rice) Straw', value: 'Paddy Straw (Rice Stubble)' },
                  { label: '🌾 Wheat Stubble', value: 'Wheat Straw & Residue' },
                  { label: '🎋 Sugarcane / Other', value: 'Sugarcane Bagasse & Tops' }
                ].map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() => setCropType(item.value)}
                    className={`p-3 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all ${
                      cropType === item.value
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Quantity in Tons with Quick Select */}
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">2. Approximate Quantity (Tons) *</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {['2.0', '5.0', '10.0', '15.0'].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setQuantity(val)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      quantity === val
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {val} Tons
                  </button>
                ))}
              </div>
              <input
                type="number"
                step="0.5"
                min="0.5"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Or enter quantity in Tons..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold text-base"
              />
            </div>

            {/* Input 3: Field Location */}
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">3. Field Location & Village *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Village Ladian, Near Canal Road, Ludhiana"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-medium text-sm"
              />
            </div>

            {/* Input 4: Preferred Pickup Date */}
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">4. Preferred Pickup Date *</label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>

            {/* Big Farmer Action Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-base py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 border-2 border-emerald-400/30"
            >
              <Truck className="w-6 h-6" /> Request Free Stubble Pickup Now
            </button>

          </form>

        </div>
      )}

      {/* Sub-Tab 2: My Pickup Requests Table */}
      {activeSubTab === 'my-requests' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Pickup Requests History</h2>
            <button
              onClick={() => setActiveSubTab('request')}
              className="bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl"
            >
              + New Request
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  <th className="p-3.5">Req ID</th>
                  <th className="p-3.5">Crop Type</th>
                  <th className="p-3.5">Volume</th>
                  <th className="p-3.5">Preferred Date</th>
                  <th className="p-3.5">Collector</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {farmerRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3.5 font-bold text-emerald-600">#{req.id}</td>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{req.cropType}</td>
                    <td className="p-3.5 font-bold">{req.quantity} Tons</td>
                    <td className="p-3.5 text-slate-500">{req.preferredDate}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{req.collectorName || 'Searching...'}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        req.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        req.status === 'Pickup In Progress' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => {
                          setTrackingSearchId(req.id);
                          setActiveTab('tracking');
                        }}
                        className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                      >
                        Track <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
