const mongoose = require('mongoose');
const { Schema } = mongoose;

const contentSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  pdf: String,
  steps: [
    {
      order: Number,
      action: String,
      expected: String
    }
  ],
  subModule: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);
