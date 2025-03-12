const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["todo", "in progress", "completed"], default: "todo" },
  due_date: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
});

module.exports = mongoose.model('Task', taskSchema);
