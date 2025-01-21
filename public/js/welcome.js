// Function to get the first word from the name in localStorage
function getFirstWordFromLocalStorage() {
    const str = localStorage.getItem("last_username");  // Get the string from localStorage
    if (str) {
        const words = str.trim().split(/\s+/);  // Split string into words and trim any extra spaces
        return words[0];  // Return the first word
    } else {
        return null;  // If no value is stored in localStorage, return null
    }
}

// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the first word from localStorage and update the span with the id "mySpan"
    const firstWord = getFirstWordFromLocalStorage();
    const span = document.getElementById("mySpan");

    const str = localStorage.getItem("last_username");  // Get the string from localStorage
    const emp_name = document.getElementById("name_employe");
    emp_name.textContent = str;

    // Update the span with the first word
    if (firstWord) {
        span.textContent = firstWord;  // Set the text content of the span to the first word
    } else {
        span.textContent = "N/A";  // Fallback in case the name is not available in localStorage
    }

    // Display the current date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('ar-EG', dateOptions);
    document.getElementById('currentDate').textContent = currentDate;
});
    z