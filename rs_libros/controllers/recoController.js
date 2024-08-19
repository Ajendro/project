const Recommendation = require('../models/recommendationModels');

exports.createRecommendation = async (req, res) => {
  try {
    const newRecommendation = new Recommendation(req.body);
    const recommendation = await newRecommendation.save();
    res.status(201).json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find().populate('user').populate('book');
    res.status(200).json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id).populate('user').populate('book');
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found' });
    res.status(200).json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found' });
    res.status(200).json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndDelete(req.params.id);
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found' });
    res.status(200).json({ message: 'Recommendation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
