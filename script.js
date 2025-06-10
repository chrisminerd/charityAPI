       document.addEventListener('DOMContentLoaded', () => {
            const einInput = document.getElementById('einInput');
            const lookupButton = document.getElementById('lookupButton');
            const apiResponsePre = document.getElementById('apiResponse');
            const messageBox = document.getElementById('messageBox');
            const messageText = document.getElementById('messageText');

            // Function to display messages in the message box
            function showMessage(message, type = 'info') {
                messageText.textContent = message;
                messageBox.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'bg-green-100', 'text-green-800', 'bg-blue-100', 'text-blue-800');
                if (type === 'error') {
                    messageBox.classList.add('bg-red-100', 'text-red-800');
                } else if (type === 'success') {
                    messageBox.classList.add('bg-green-100', 'text-green-800');
                } else {
                    messageBox.classList.add('bg-blue-100', 'text-blue-800');
                }
                messageBox.classList.remove('hidden');
            }

            // Function to hide the message box
            function hideMessage() {
                messageBox.classList.add('hidden');
            }

            lookupButton.addEventListener('click', async () => {
                const ein = einInput.value.trim();
                hideMessage(); // Clear previous messages
                apiResponsePre.textContent = 'Loading...'; // Show loading state

                if (!ein) {
                    apiResponsePre.textContent = '';
                    showMessage('Please enter an EIN.', 'error');
                    return;
                }

                // Construct the API URL using the provided snippet pattern
                const apiUrl = `https://api.charityapi.org/api/organizations/${ein}`;

                try {
                    // Make the API call using fetch
                    const response = await fetch(apiUrl);

                    // Check if the response was successful
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
                        throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.message || response.statusText}`);
                    }

                    // Parse the JSON response
                    const data = await response.json();

                    // Display the formatted JSON response
                    apiResponsePre.textContent = JSON.stringify(data, null, 2);
                    showMessage('Organization data fetched successfully!', 'success');

                } catch (error) {
                    // Handle any errors that occurred during the fetch operation
                    apiResponsePre.textContent = 'Error fetching data.';
                    console.error('Error fetching data:', error);
                    showMessage(`Failed to lookup organization: ${error.message}`, 'error');
                }
            });
        });
