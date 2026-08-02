let mongoose;
try { mongoose = require('mongoose'); } catch (e) { mongoose = require('../../backend/node_modules/mongoose'); }

const TimelineStepSchema = new mongoose.Schema({
  step: { type: String, required: true },
  date: { type: String, default: '--' },
  completed: { type: Boolean, default: false },
  details: { type: String }
});

const WasteRequestSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerName: { type: String, required: true },
  farmerMobile: { type: String, required: true },
  cropType: { type: String, required: true },
  wasteType: { type: String, default: 'Dry Stubble' },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'Tons' },
  address: { type: String, required: true },
  village: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  preferredDate: { type: String, required: true },
  image: { type: String },
  additionalNotes: { type: String },
  status: { 
    type: String, 
    enum: ['Pickup Requested', 'Collector Assigned', 'Pickup In Progress', 'Waste Delivered', 'Compost Processing', 'Completed'],
    default: 'Pickup Requested' 
  },
  collectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collectorName: { type: String },
  compostUnitId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  compostUnitName: { type: String },
  timeline: [TimelineStepSchema]
}, { timestamps: true });

module.exports = mongoose.model('WasteRequest', WasteRequestSchema);
