export const SAMPLE_ACCOUNTS = {
  farmer: {
    id: "usr_farmer_01",
    name: "Ramesh Kumar",
    role: "farmer",
    email: "ramesh.farmer@agroloop.in",
    mobile: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    village: "Ladian",
    district: "Ludhiana",
    state: "Punjab",
    address: "Farm Road #4, Village Ladian, Ludhiana, Punjab",
    ecoPoints: 450,
    totalWasteSaved: "28.5 Tons",
    co2Prevented: "14.2 Tons",
  },
  collector: {
    id: "usr_collector_01",
    name: "GreenTrans Logistics (Manpreet Singh)",
    role: "collector",
    email: "green.trans@agroloop.in",
    mobile: "+91 98123 45678",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    company: "GreenTrans Eco Logistics",
    vehicleNumber: "PB-10-CZ-8842",
    vehicleCapacity: "10 Tons Hydraulic Tipper",
    village: "Doraha",
    district: "Ludhiana",
    state: "Punjab",
    address: "GT Road Transport Hub, Doraha, Ludhiana",
    rating: 4.9,
    completedPickups: 142,
    activeJobsCount: 2,
  },
  compost_unit: {
    id: "usr_compost_01",
    name: "BioTerra Organic Compost Plant",
    role: "compost_unit",
    email: "bioterra@agroloop.in",
    mobile: "+91 97788 99000",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    plantName: "BioTerra Bio-Decomposer Unit #2",
    capacityPerDay: "50 Tons / Day",
    district: "Ludhiana",
    state: "Punjab",
    address: "Industrial Bio-Park, Focal Point Phase VIII, Ludhiana",
    totalCompostProduced: "640 Tons",
    activeBatches: 5,
  },
  admin: {
    id: "usr_admin_01",
    name: "Dr. Ananya Sharma (Admin)",
    role: "admin",
    email: "admin@agroloop.in",
    mobile: "+91 90000 11111",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    designation: "Chief Environmental Officer",
    department: "Platform Operations & Quality Control",
  }
};

export const INITIAL_REQUESTS = [
  {
    id: "AGRO-8942",
    farmerId: "usr_farmer_01",
    farmerName: "Ramesh Kumar",
    farmerMobile: "+91 98765 43210",
    cropType: "Paddy Straw (Rice Stubble)",
    wasteType: "Dry Stubble",
    quantity: 6.5, // in Tons
    unit: "Tons",
    address: "Farm Field #12, Ladian Village",
    village: "Ladian",
    district: "Ludhiana",
    state: "Punjab",
    preferredDate: "2026-07-28",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80",
    additionalNotes: "Field cleared and baled in 50kg bundles. Easy access for 10-ton tipper lorry.",
    status: "Pickup In Progress",
    collectorId: "usr_collector_01",
    collectorName: "GreenTrans Logistics",
    compostUnitId: "usr_compost_01",
    compostUnitName: "BioTerra Organic Compost Plant",
    createdAt: "2026-07-25 09:30 AM",
    timeline: [
      { step: "Pickup Requested", date: "2026-07-25 09:30 AM", completed: true, details: "Request created by Farmer Ramesh Kumar" },
      { step: "Collector Assigned", date: "2026-07-25 11:15 AM", completed: true, details: "Accepted by GreenTrans Logistics (PB-10-CZ-8842)" },
      { step: "Pickup In Progress", date: "2026-07-26 08:00 AM", completed: true, details: "Collector truck en-route to field site" },
      { step: "Waste Delivered", date: "--", completed: false, details: "Pending delivery to BioTerra Plant" },
      { step: "Compost Processing", date: "--", completed: false, details: "Awaiting microbial decomposition" },
      { step: "Completed", date: "--", completed: false, details: "Final organic compost production" }
    ]
  },
  {
    id: "AGRO-7301",
    farmerId: "usr_farmer_02",
    farmerName: "Gurpreet Singh",
    farmerMobile: "+91 98111 22233",
    cropType: "Sugarcane Bagasse & Tops",
    wasteType: "Green Residue",
    quantity: 12.0,
    unit: "Tons",
    address: "Kheri Farm, Near Canal Road",
    village: "Samrala",
    district: "Ludhiana",
    state: "Punjab",
    preferredDate: "2026-07-29",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80",
    additionalNotes: "Fresh cane tops harvested yesterday. Need prompt pickup before drying out.",
    status: "Collector Assigned",
    collectorId: "usr_collector_01",
    collectorName: "GreenTrans Logistics",
    compostUnitId: "usr_compost_01",
    compostUnitName: "BioTerra Organic Compost Plant",
    createdAt: "2026-07-26 10:00 AM",
    timeline: [
      { step: "Pickup Requested", date: "2026-07-26 10:00 AM", completed: true, details: "Request submitted by Gurpreet Singh" },
      { step: "Collector Assigned", date: "2026-07-26 02:45 PM", completed: true, details: "Assigned to GreenTrans Logistics" },
      { step: "Pickup In Progress", date: "--", completed: false, details: "Scheduled for pickup tomorrow" },
      { step: "Waste Delivered", date: "--", completed: false, details: "--" },
      { step: "Compost Processing", date: "--", completed: false, details: "--" },
      { step: "Completed", date: "--", completed: false, details: "--" }
    ]
  },
  {
    id: "AGRO-6520",
    farmerId: "usr_farmer_03",
    farmerName: "Balwinder Kaur",
    farmerMobile: "+91 97766 55443",
    cropType: "Wheat Straw",
    wasteType: "Dry Stubble",
    quantity: 4.2,
    unit: "Tons",
    address: "Village Sahnewal GT Road Side",
    village: "Sahnewal",
    district: "Ludhiana",
    state: "Punjab",
    preferredDate: "2026-07-30",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80",
    additionalNotes: "Wheat straw baled cleanly, dry storage under shed.",
    status: "Pickup Requested",
    collectorId: null,
    collectorName: null,
    compostUnitId: null,
    compostUnitName: null,
    createdAt: "2026-07-26 01:15 PM",
    timeline: [
      { step: "Pickup Requested", date: "2026-07-26 01:15 PM", completed: true, details: "Request open for nearby collectors" },
      { step: "Collector Assigned", date: "--", completed: false, details: "Waiting for nearby collector" },
      { step: "Pickup In Progress", date: "--", completed: false, details: "--" },
      { step: "Waste Delivered", date: "--", completed: false, details: "--" },
      { step: "Compost Processing", date: "--", completed: false, details: "--" },
      { step: "Completed", date: "--", completed: false, details: "--" }
    ]
  },
  {
    id: "AGRO-5110",
    farmerId: "usr_farmer_01",
    farmerName: "Ramesh Kumar",
    farmerMobile: "+91 98765 43210",
    cropType: "Maize Stalks",
    wasteType: "Dry Stubble",
    quantity: 8.0,
    unit: "Tons",
    address: "Farm Road #4, Village Ladian",
    village: "Ladian",
    district: "Ludhiana",
    state: "Punjab",
    preferredDate: "2026-07-15",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80",
    additionalNotes: "Successfully picked up and processed into enriched bio-char manure.",
    status: "Completed",
    collectorId: "usr_collector_01",
    collectorName: "GreenTrans Logistics",
    compostUnitId: "usr_compost_01",
    compostUnitName: "BioTerra Organic Compost Plant",
    createdAt: "2026-07-12 11:00 AM",
    timeline: [
      { step: "Pickup Requested", date: "2026-07-12 11:00 AM", completed: true, details: "Request created" },
      { step: "Collector Assigned", date: "2026-07-12 02:00 PM", completed: true, details: "GreenTrans Logistics assigned" },
      { step: "Pickup In Progress", date: "2026-07-13 09:00 AM", completed: true, details: "Picked up from site" },
      { step: "Waste Delivered", date: "2026-07-13 01:30 PM", completed: true, details: "Delivered to BioTerra Plant" },
      { step: "Compost Processing", date: "2026-07-14 10:00 AM", completed: true, details: "Decomposed with Pusa bio-decomposer" },
      { step: "Completed", date: "2026-07-20 04:00 PM", completed: true, details: "Organic compost certified & packed" }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif_1",
    title: "Truck En-Route for Pickup",
    message: "GreenTrans Logistics (PB-10-CZ-8842) is on the way to pick up request #AGRO-8942.",
    time: "10 mins ago",
    unread: true,
    type: "pickup"
  },
  {
    id: "notif_2",
    title: "New Pickup Available Nearby",
    message: "New Wheat Straw pickup (4.2 Tons) requested in Sahnewal (8.5 km away).",
    time: "45 mins ago",
    unread: true,
    type: "collector"
  },
  {
    id: "notif_3",
    title: "Batch #C-408 Organic Manure Ready",
    message: "BioTerra Compost Plant has finalized 18 Tons of enriched organic manure ready for distribution.",
    time: "2 hours ago",
    unread: false,
    type: "compost"
  },
  {
    id: "notif_4",
    title: "Eco-Points Credited!",
    message: "You earned 120 Eco-Points for request #AGRO-5110 (8.0 Tons saved from burning).",
    time: "1 day ago",
    unread: false,
    type: "reward"
  }
];

export const MOCK_ANALYTICS = {
  totalFarmers: 12450,
  totalCollectors: 840,
  totalCompostUnits: 195,
  totalRequests: 34890,
  pendingRequests: 420,
  completedRequests: 33150,
  totalWasteRecycledTons: 148500,
  co2PreventedTons: 74250,
  compostProducedTons: 103950,
  monthlyWasteData: [
    { month: "Jan", wasteTons: 8400, compostTons: 5800 },
    { month: "Feb", wasteTons: 9200, compostTons: 6400 },
    { month: "Mar", wasteTons: 14500, compostTons: 10100 },
    { month: "Apr", wasteTons: 22000, compostTons: 15400 },
    { month: "May", wasteTons: 18500, compostTons: 12900 },
    { month: "Jun", wasteTons: 12000, compostTons: 8400 },
    { month: "Jul", wasteTons: 16500, compostTons: 11500 },
    { month: "Aug", wasteTons: 19800, compostTons: 13800 },
    { month: "Sep", wasteTons: 28400, compostTons: 19800 },
    { month: "Oct", wasteTons: 35600, compostTons: 24900 },
    { month: "Nov", wasteTons: 42100, compostTons: 29400 },
    { month: "Dec", wasteTons: 21000, compostTons: 14700 }
  ],
  wasteTypeBreakdown: [
    { type: "Paddy Straw", percentage: 48, color: "#2E7D32" },
    { type: "Wheat Straw", percentage: 26, color: "#66BB6A" },
    { type: "Sugarcane Bagasse", percentage: 14, color: "#8D6E63" },
    { type: "Maize & Cotton Stalks", percentage: 8, color: "#FBC02D" },
    { type: "Mustard Straw & Others", percentage: 4, color: "#26A69A" }
  ],
  districtBreakdown: [
    { district: "Ludhiana (PB)", count: 8420 },
    { district: "Karnal (HR)", count: 7190 },
    { district: "Amritsar (PB)", count: 6850 },
    { district: "Meerut (UP)", count: 5410 },
    { district: "Bathinda (PB)", count: 4920 },
    { district: "Kurukshetra (HR)", count: 4100 }
  ]
};

export const MOCK_REVIEWS = [
  {
    id: "rev_1",
    userName: "Harpal Singh",
    userRole: "Farmer",
    userLocation: "Patiala, Punjab",
    rating: 5,
    date: "2026-07-20",
    comment: "Earlier we had no option except burning paddy straw. With AgroLoop, GreenTrans collector arrived within 24 hours and cleared my 15-acre field without any fee!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "rev_2",
    userName: "BioGold Fertilisers Ltd",
    userRole: "Compost Producer",
    userLocation: "Karnal, Haryana",
    rating: 5,
    date: "2026-07-18",
    comment: "AgroLoop solved our raw biomass supply chain completely. We receive daily quality graded paddy straw bales directly at our processing plant.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "rev_3",
    userName: "Sukhdev Transports",
    userRole: "Waste Collector",
    userLocation: "Sangrur, Punjab",
    rating: 4,
    date: "2026-07-15",
    comment: "Excellent app for fleet operators. We get geo-located pickup requests right on the dashboard with estimated tonnage.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
  }
];

export const MOCK_PENDING_USERS = [
  {
    id: "usr_pend_01",
    name: "Kisan Eco Haulers",
    role: "collector",
    email: "contact@kisanhaulers.in",
    mobile: "+91 99887 76655",
    district: "Amritsar",
    state: "Punjab",
    details: "Vehicle: PB-02-AX-9912 (12-Ton Tipper Lorry)",
    appliedAt: "2026-07-26 08:30 AM"
  },
  {
    id: "usr_pend_02",
    name: "GreenEarth Microbes & Compost",
    role: "compost_unit",
    email: "info@greenearthcompost.org",
    mobile: "+91 98444 33221",
    district: "Kurukshetra",
    state: "Haryana",
    details: "Plant Capacity: 40 Tons / Day",
    appliedAt: "2026-07-26 11:00 AM"
  }
];
