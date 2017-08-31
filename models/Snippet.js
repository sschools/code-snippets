const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  _id: { type: Number },
  username: { type: String },
  title: { type: String },
  langauge: { type: String },
  tags: { type: Array },
  code: { type: String },
  notes: { type: String }
});

const Snippet = mongoose.model('Snippet', SnippetSchema);

module.exports = Snippet;
