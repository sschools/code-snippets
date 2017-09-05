const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  username: { type: String },
  title: { type: String },
  language: { type: String },
  tags: { type: Array },
  code: { type: String },
  notes: { type: String }
});

const Snippet = mongoose.model('Snippet', SnippetSchema);

module.exports = Snippet;
