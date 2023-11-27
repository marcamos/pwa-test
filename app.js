// Get the form element for adding a new period
const newPeriodFormEl = document.getElementsByTagName('form')[0];

// Get the input elements for start and end dates
const startDateInputEl = document.getElementById('start-date');
const endDateInputEl = document.getElementById('end-date');

// Get the container for displaying past periods
const pastPeriodContainer = document.getElementById('past-periods');

// Add an event listener to the form for submitting new period data
newPeriodFormEl.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve the values entered for start and end dates
    const startDate = startDateInputEl.value;
    const endDate = endDateInputEl.value;

    // Check if the entered dates are invalid
    if (checkDatesInvalid(startDate, endDate)) {
        return;
    };

    // Store the new period in local storage
    storeNewPeriod(startDate, endDate);

    // Render the updated list of past periods
    renderPastPeriods();

    // Reset the form fields after submission
    newPeriodFormEl.reset();
});

// Function to check if the entered dates are invalid
function checkDatesInvalid(startDate, endDate) {
    if (!startDate || !endDate || startDate > endDate) {
        // Reset the form if dates are invalid and log an error message
        newPeriodFormEl.reset();
        console.log('Invalid dates');
        return true;
    }
    console.log('Valid dates');
    return false;
}

// Key used for storing periods in local storage
const STORAGE_KEY = "period-tracker";

// Function to store a new period in local storage
function storeNewPeriod(startDate, endDate) {
    // Retrieve existing periods or initialize an empty array
    const periods = getAllStoredPeriods();

    // Add the new period to the array and sort by start date
    periods.push({ startDate, endDate });
    periods.sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate);
    });

    // Save the updated periods array in local storage
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(periods));
}

// Function to retrieve all stored periods from local storage
function getAllStoredPeriods() {
    // Retrieve data from local storage or initialize an empty array
    const data = window.localStorage.getItem(STORAGE_KEY);
    const periods = data ? JSON.parse(data) : [];
    return periods;
}

// Function to render the list of past periods in the UI
function renderPastPeriods() {
    // Retrieve all stored periods from local storage
    const periods = getAllStoredPeriods();

    // If there are no periods stored, do not render anything
    if (periods.length === 0) {
        return;
    }

    // Clear the previous content in the past periods container
    pastPeriodContainer.innerHTML = '';

    // Create header and list elements for displaying past periods
    const pastPeriodHeader = document.createElement('h2');
    pastPeriodHeader.textContent = 'Past periods';
    const pastPeriodList = document.createElement('ul');

    // Iterate through each period and create list items to display start and end dates
    periods.forEach((period) => {
        const periodEl = document.createElement('li');
        periodEl.textContent = `From ${formatDate(period.startDate)} to ${formatDate(period.endDate)}`;
        pastPeriodList.appendChild(periodEl);
    });

    // Append the header and list of past periods to the container
    pastPeriodContainer.appendChild(pastPeriodHeader);
    pastPeriodContainer.appendChild(pastPeriodList);
}

// Function to format a date string to a readable format
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}

// Initially render the list of past periods when the page loads
renderPastPeriods();
