function loadDescription(fileName, elementId) {
    const descriptionElement = document.getElementById(elementId);
    
    // Check if the description is currently visible
    if (descriptionElement.innerText) {
        // If visible, clear the text (hide it)
        descriptionElement.innerText = "";
    } else {
        // If hidden, fetch and display the text
        fetch(`projects/${fileName}`)  // Include 'projects/' in the path
            .then(response => {
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`); // Log the status code
                    throw new Error('Failed to load file');
                }
                return response.text();
            })
            .then(data => {
                descriptionElement.innerText = data;
            })
            .catch(error => {
                console.error('Error:', error);
                descriptionElement.innerText = "Error loading description.";
            });
    }
}



function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
