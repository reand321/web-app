import { addRecommendation, getRecommendationsFromDB } from '../models/recommendationModel.js';

export const uploadRecommendation = (req, res) => {
    const { title, description, comment } = req.body;
    const image = req.file ? req.file.path : null; 
    addRecommendation(title, description, comment, image, (err, lastID) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Recommendation added successfully!', id: lastID });
    });
};

export const getRecommendations = (req, res) => {
    getRecommendationsFromDB((err, recommendations) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        recommendations.forEach(recommendation => {
            // Ensure the image path is fully accessible, adjust if necessary
            if (recommendation.image) {
                recommendation.image = `/uploads/${recommendation.image.split('/').pop()}`;
            }
        });
        res.json(recommendations);
    });
};
