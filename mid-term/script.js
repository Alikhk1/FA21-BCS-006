function loadDescription(fileName, elementId) {
    fetch('projects/' + fileName)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerText = data;
        })
        .catch(error => {
            document.getElementById(elementId).innerText = 'Error loading description';
        });
}
