document.addEventListener('DOMContentLoaded', () => {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const resultContainer = document.getElementById('result-container');
    const loader = document.getElementById('loader');
    const suggestionContentDiv = document.getElementById('suggestion-content');
    const errorInfoDiv = document.getElementById('error-info');

    // The URL of our Java backend.
    const API_BASE_URL = 'http://localhost:8080';

    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mood = button.getAttribute('data-mood');
            fetchSuggestion(mood);
        });
    });

    async function fetchSuggestion(mood) {
        // Show the result container and the loader
        resultContainer.classList.remove('hidden');
        loader.classList.remove('hidden');
        suggestionContentDiv.innerHTML = '';
        errorInfoDiv.innerHTML = '';

        try {
            // Fetch data from our Spring Boot server. No location needed!
            const response = await fetch(`${API_BASE_URL}/api/suggestion?mood=${mood}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            
            // Display the results
            displayResults(data);

        } catch (error) {
            console.error('Error fetching suggestion:', error);
            showError('Could not connect to the server. Please ensure the Java application is running.');
        }
    }

    function displayResults(data) {
        loader.classList.add('hidden');

        suggestionContentDiv.innerHTML = `
            <div class="city-card">
                <div class="card-label">Top Destination</div>
                <h3>${data.bestCity}</h3>
                <p>${data.bestCityDescription}</p>
            </div>
            <div class="city-card">
                <div class="card-label">Indian Alternative</div>
                <h3>${data.indianAlternative}</h3>
                <p>${data.indianAlternativeDescription}</p>
            </div>
        `;
    }
    
    function showError(message) {
        loader.classList.add('hidden');
        errorInfoDiv.textContent = message;
    }
});
