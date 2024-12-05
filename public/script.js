fetch('/api/items')
    .then(response => response.json())
    .then(data => {
        const animeList = document.getElementById('anime-list');
        // Display AniList data
        data.animeData.forEach(anime => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${anime.title.romaji}</h3>
                <img src="${anime.coverImage.large}" alt="${anime.title.romaji}" width="200" />
                <div class="anime-description">
                    <p>${anime.description ? anime.description : "No description available"}</p>
                </div>
            `;
            animeList.appendChild(li);
        });

        // Display uploaded recommendations
        const recommendationsList = document.getElementById('recommendations-list');
        data.recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${recommendation.title}</h3>
                <img src="${recommendation.image}" alt="${recommendation.title}" width="200" />
                <p>${recommendation.description ? recommendation.description : "No description available"}</p>
                <p>${recommendation.comment ? recommendation.comment : "No comments available"}</p>
            `;
            recommendationsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
