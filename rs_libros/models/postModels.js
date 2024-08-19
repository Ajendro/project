const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  content: String,
  createdAt: { type: Date, default: Date.now },
  availability: {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  bookCondition: { type: String, enum: ['Good', 'Bad'], required: true },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
