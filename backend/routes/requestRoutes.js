const express = require('express');
const router = express.Router();
const WasteRequest = require('../../database/models/WasteRequest');

// GET /api/requests - Get all requests with optional filters
router.get('/', async (req, res) => {
  try {
    const { district, status, role, userId } = req.query;
    let query = {};
    if (district) query.district = district;
    if (status) query.status = status;
    if (userId && role === 'farmer') query.farmerId = userId;
    if (userId && role === 'collector') query.collectorId = userId;

    const requests = await WasteRequest.find(query).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching waste requests' });
  }
});

// POST /api/requests - Farmer creates new waste pickup request
router.post('/', async (req, res) => {
  try {
    const newRequest = new WasteRequest({
      ...req.body,
      timeline: [
        { step: 'Pickup Requested', date: new Date().toLocaleString(), completed: true, details: 'Request created' },
        { step: 'Collector Assigned', date: '--', completed: false, details: 'Waiting for nearby collector' },
        { step: 'Pickup In Progress', date: '--', completed: false, details: '--' },
        { step: 'Waste Delivered', date: '--', completed: false, details: '--' },
        { step: 'Compost Processing', date: '--', completed: false, details: '--' },
        { step: 'Completed', date: '--', completed: false, details: '--' }
      ]
    });

    const saved = await newRequest.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating waste request', error: err.message });
  }
});

// PUT /api/requests/:id/accept - Collector accepts request
router.put('/:id/accept', async (req, res) => {
  try {
    const { collectorId, collectorName } = req.body;
    const reqItem = await WasteRequest.findById(req.params.id);
    if (!reqItem) return res.status(404).json({ message: 'Request not found' });

    reqItem.status = 'Collector Assigned';
    reqItem.collectorId = collectorId;
    reqItem.collectorName = collectorName;
    reqItem.timeline = reqItem.timeline.map(t => {
      if (t.step === 'Collector Assigned') return { ...t, completed: true, date: new Date().toLocaleString(), details: `Accepted by ${collectorName}` };
      return t;
    });

    await reqItem.save();
    res.json(reqItem);
  } catch (err) {
    res.status(500).json({ message: 'Error accepting request' });
  }
});

// PUT /api/requests/:id/status - Update request status step
router.put('/:id/status', async (req, res) => {
  try {
    const { status, details } = req.body;
    const reqItem = await WasteRequest.findById(req.params.id);
    if (!reqItem) return res.status(404).json({ message: 'Request not found' });

    reqItem.status = status;
    reqItem.timeline = reqItem.timeline.map(t => {
      if (t.step === status) return { ...t, completed: true, date: new Date().toLocaleString(), details: details || `Updated to ${status}` };
      return t;
    });

    await reqItem.save();
    res.json(reqItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
});

module.exports = router;
