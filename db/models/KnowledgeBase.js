const mongoose = require("mongoose");

const KnowledgeBaseSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

// Update the updatedAt field on save
KnowledgeBaseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("KnowledgeBase", KnowledgeBaseSchema);
