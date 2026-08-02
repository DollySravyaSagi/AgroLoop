import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_ACCOUNTS, INITIAL_REQUESTS, INITIAL_NOTIFICATIONS, MOCK_ANALYTICS, MOCK_REVIEWS, MOCK_PENDING_USERS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState('light');
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('home');
  
  // User Authentication / Current Role
  const [user, setUser] = useState(SAMPLE_ACCOUNTS.farmer);
  
  // Persistent Registered Users list
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('agroloop_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const registerUser = (userData) => {
    const updated = [userData, ...registeredUsers.filter(u => u.email !== userData.email)];
    setRegisteredUsers(updated);
    try {
      localStorage.setItem('agroloop_registered_users', JSON.stringify(updated));
    } catch (e) {}
    setUser(userData);
  };

  const loginUser = (email, password) => {
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanPass = password ? password.trim() : '';

    const found = registeredUsers.find(u => {
      const uEmail = u.email ? u.email.trim().toLowerCase() : '';
      const uPass = u.password ? u.password.trim() : '';
      return uEmail === cleanEmail && (!uPass || !cleanPass || uPass === cleanPass);
    });

    if (found) {
      setUser(found);
      showToast(`Welcome back, ${found.name}!`, 'success');
      const role = found.role;
      if (role === 'collector') setActiveTab('collector-dashboard');
      else if (role === 'compost_unit') setActiveTab('compost-dashboard');
      else if (role === 'admin') setActiveTab('admin-dashboard');
      else setActiveTab('farmer-dashboard');
      return true;
    }
    return false;
  };
  
  // Data states
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [pendingUsers, setPendingUsers] = useState(MOCK_PENDING_USERS);
  const [analytics, setAnalytics] = useState(MOCK_ANALYTICS);
  
  // UI states
  const [trackingSearchId, setTrackingSearchId] = useState('');
  const [toast, setToast] = useState(null);

  // Toggle Dark Mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toast Notification Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Switch demo account role
  const switchRole = (roleKey) => {
    if (SAMPLE_ACCOUNTS[roleKey]) {
      setUser(SAMPLE_ACCOUNTS[roleKey]);
      showToast(`Switched user role to ${SAMPLE_ACCOUNTS[roleKey].name} (${roleKey.toUpperCase()})`, 'info');
      // Navigate to matching dashboard if appropriate
      if (roleKey === 'farmer') setActiveTab('farmer-dashboard');
      else if (roleKey === 'collector') setActiveTab('collector-dashboard');
      else if (roleKey === 'compost_unit') setActiveTab('compost-dashboard');
      else if (roleKey === 'admin') setActiveTab('admin-dashboard');
    }
  };

  // Farmer creates new pickup request
  const createRequest = (reqData) => {
    const newId = `AGRO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq = {
      id: newId,
      farmerId: user?.id || 'usr_farmer_guest',
      farmerName: user?.name || reqData.farmerName || 'Farmer User',
      farmerMobile: user?.mobile || reqData.farmerMobile || '+91 98000 00000',
      cropType: reqData.cropType,
      wasteType: reqData.wasteType || 'Dry Stubble',
      quantity: parseFloat(reqData.quantity),
      unit: reqData.unit || 'Tons',
      address: reqData.address,
      village: reqData.village || user?.village || 'Ludhiana Rural',
      district: reqData.district || user?.district || 'Ludhiana',
      state: reqData.state || user?.state || 'Punjab',
      preferredDate: reqData.preferredDate,
      image: reqData.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
      additionalNotes: reqData.additionalNotes || 'N/A',
      status: 'Pickup Requested',
      collectorId: null,
      collectorName: null,
      compostUnitId: null,
      compostUnitName: null,
      createdAt: new Date().toLocaleString(),
      timeline: [
        { step: "Pickup Requested", date: new Date().toLocaleString(), completed: true, details: "Request created by Farmer" },
        { step: "Collector Assigned", date: "--", completed: false, details: "Waiting for nearby collector" },
        { step: "Pickup In Progress", date: "--", completed: false, details: "--" },
        { step: "Waste Delivered", date: "--", completed: false, details: "--" },
        { step: "Compost Processing", date: "--", completed: false, details: "--" },
        { step: "Completed", date: "--", completed: false, details: "--" }
      ]
    };

    setRequests([newReq, ...requests]);
    
    // Add notification
    const newNotif = {
      id: `notif_${Date.now()}`,
      title: 'Pickup Request Created',
      message: `Your request #${newId} for ${newReq.quantity} Tons of ${newReq.cropType} was posted.`,
      time: 'Just now',
      unread: true,
      type: 'pickup'
    };
    setNotifications([newNotif, ...notifications]);

    showToast(`Pickup request #${newId} submitted successfully!`, 'success');
    return newId;
  };

  // Collector accepts a request
  const acceptRequest = (requestId) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const updatedTimeline = req.timeline.map(t => {
          if (t.step === "Collector Assigned") return { ...t, completed: true, date: new Date().toLocaleString(), details: `Accepted by ${user.name}` };
          return t;
        });
        return {
          ...req,
          status: 'Collector Assigned',
          collectorId: user.id,
          collectorName: user.name,
          compostUnitId: 'usr_compost_01',
          compostUnitName: 'BioTerra Organic Compost Plant',
          timeline: updatedTimeline
        };
      }
      return req;
    }));

    showToast(`Request #${requestId} accepted! Pickup route added to your dashboard.`, 'success');
  };

  // Update pickup request status (Collector or Compost Unit)
  const updateRequestStatus = (requestId, nextStatus, detailsNote = '') => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const nowStr = new Date().toLocaleString();
        const updatedTimeline = req.timeline.map(t => {
          if (t.step === nextStatus) {
            return { ...t, completed: true, date: nowStr, details: detailsNote || `Updated to ${nextStatus}` };
          }
          return t;
        });

        // Update analytics if completed
        if (nextStatus === 'Completed' && req.status !== 'Completed') {
          setAnalytics(a => ({
            ...a,
            completedRequests: a.completedRequests + 1,
            totalWasteRecycledTons: a.totalWasteRecycledTons + req.quantity,
            co2PreventedTons: Math.round(a.co2PreventedTons + (req.quantity * 0.5)),
            compostProducedTons: Math.round(a.compostProducedTons + (req.quantity * 0.7))
          }));
        }

        return {
          ...req,
          status: nextStatus,
          timeline: updatedTimeline
        };
      }
      return req;
    }));

    showToast(`Request #${requestId} status updated to "${nextStatus}".`, 'info');
  };

  // Submit Feedback / Review
  const addReview = (reviewData) => {
    const newRev = {
      id: `rev_${Date.now()}`,
      userName: user ? user.name : reviewData.userName,
      userRole: user ? (user.role === 'farmer' ? 'Farmer' : user.role === 'collector' ? 'Collector' : 'Compost Producer') : 'User',
      userLocation: reviewData.userLocation || `${user?.district || 'Ludhiana'}, ${user?.state || 'Punjab'}`,
      rating: parseInt(reviewData.rating),
      date: new Date().toISOString().split('T')[0],
      comment: reviewData.comment
    };
    setReviews([newRev, ...reviews]);
    showToast('Thank you for your feedback!', 'success');
  };

  // Admin Approve / Reject User
  const approveUser = (userId) => {
    const approvedUser = pendingUsers.find(u => u.id === userId);
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    showToast(`User account "${approvedUser?.name}" approved!`, 'success');
  };

  const rejectUser = (userId) => {
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    showToast('Registration application rejected.', 'warning');
  };

  // Mark all notifications read
  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      activeTab,
      setActiveTab,
      user,
      setUser,
      registeredUsers,
      registerUser,
      loginUser,
      switchRole,
      requests,
      createRequest,
      acceptRequest,
      updateRequestStatus,
      notifications,
      markNotificationsRead,
      analytics,
      reviews,
      addReview,
      pendingUsers,
      approveUser,
      rejectUser,
      trackingSearchId,
      setTrackingSearchId,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
