let mongoose;
try { mongoose = require('mongoose'); } catch (e) { mongoose = require('../../backend/node_modules/mongoose'); }

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['farmer', 'collector', 'compost_unit', 'admin'], 
    default: 'farmer' 
  },
  address: { type: String },
  village: { type: String },
  district: { type: String, required: true },
  state: { type: String, required: true },
  isApproved: { type: Boolean, default: true },
  
  // Role Specific Details
  ecoPoints: { type: Number, default: 100 },
  company: { type: String },
  vehicleNumber: { type: String },
  vehicleCapacity: { type: String },
  plantName: { type: String },
  capacityPerDay: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
