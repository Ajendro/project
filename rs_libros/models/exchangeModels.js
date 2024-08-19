const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['requested', 'accepted', 'completed', 'declined'], default: 'requested' },
  loanDate: { type: Date }, 
  returnDate: { type: Date }, 
  returnCondition: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Exchange = mongoose.model('Exchange', exchangeSchema);
module.exports = Exchange;
