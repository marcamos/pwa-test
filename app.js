const newPeriodFormEl = document.getElementsByTagName('form')[0];
const startDateInputEl = document.getElementById('start-date');
const endDateInputEl = document.getElementById('end-date');
const pastPeriodContainer = document.getElementById('past-periods');

newPeriodFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const startDate = startDateInputEl.value;
    const endDate = endDateInputEl.value;
    if (checkDatesInvalid(startDate, endDate)) {
        return;
    };
    storeNewPeriod(startDate, endDate);
    renderPastPeriods();
    newPeriodFormEl.reset();
});

function checkDatesInvalid(startDate, endDate) {
    if (!startDate || !endDate || startDate > endDate) {
        newPeriodFormEl.reset();
        console.log('Invalid dates');
        return true;
    }
    console.log('Valid dates');
    return false;
}

const STORAGE_KEY = "period-tracker";

function storeNewPeriod(startDate, endDate) {
    const periods = getAllStoredPeriods();
    periods.push({ startDate, endDate });
    periods.sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate);
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(periods));
}

function getAllStoredPeriods() {
    const data = window.localStorage.getItem(STORAGE_KEY);
    const periods = data ? JSON.parse(data) : [];
    return periods;
}

function renderPastPeriods() {
    const periods = getAllStoredPeriods();
    if (periods.length === 0) {
        return;
    }
    pastPeriodContainer.innerHTML = '';
    const pastPeriodHeader = document.createElement('h2');
    pastPeriodHeader.textContent = 'Past periods';
    const pastPeriodList = document.createElement('ul');
    periods.forEach((period) => {
        const periodEl = document.createElement('li');
        periodEl.textContent = `From ${formatDate(period.startDate)} to ${formatDate(period.endDate)}`;
        pastPeriodList.appendChild(periodEl);
    });
    pastPeriodContainer.appendChild(pastPeriodHeader);
    pastPeriodContainer.appendChild(pastPeriodList);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}

renderPastPeriods();