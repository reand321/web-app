import fetch from 'node-fetch';
import { getRecommendationsFromDB } from '../models/recommendationModel.js';

const ANI_LIST_API_URL = 'https://graphql.anilist.co/';

async function fetchAniListData() {
    const query = `
    query {
        Page (page: 1, perPage: 5) {
            media {
                title {
                    romaji
                }
                description
                coverImage {
                    large
                }
            }
        }
    }`;

    try {
        const response = await fetch(ANI_LIST_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        return data.data.Page.media;
    } catch (error) {
        console.error('Error fetching AniList data:', error);
        return [];
    }
}

export const getAniListData = async (req, res) => {
    const animeData = await fetchAniListData(); 
    getRecommendationsFromDB((err, recommendations) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        recommendations.forEach(recommendation => {
            if (recommendation.image) {
                recommendation.image = `/uploads/${recommendation.image.split('/').pop()}`;
            }
        });
        res.json({ animeData, recommendations }); // Send both anime data and recommendations
    });
};
