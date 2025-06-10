// script.js
document.addEventListener('DOMContentLoaded', () => {
    const fetchDataButton = document.getElementById('fetchDataButton');
    const apiResponseDiv = document.getElementById('apiResponse');

    fetchDataButton.addEventListener('click', async () => {
        apiResponseDiv.textContent = 'Loading data...'; // Show loading message

        try {
            // Replace with the actual public API you want to call
            // For example, fetching a random user from jsonplaceholder
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

            if (!response.ok) {
                // If response is not OK (e.g., 404, 500), throw an error
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Parse the JSON response

            // Display the data in a readable format
            apiResponseDiv.textContent = JSON.stringify(data, null, 2);

        } catch (error) {
            // Handle any errors during the fetch operation
            apiResponseDiv.textContent = `Error: ${error.message}`;
            console.error('There was a problem with the fetch operation:', error);
        }
    });
});
