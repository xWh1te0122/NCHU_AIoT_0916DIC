let is24HourFormat = true; // Default format

// DOM Elements
const clockElement = document.getElementById('clock');
const ampmElement = document.getElementById('ampm');
const dateElement = document.getElementById('date');
const greetingElement = document.getElementById('greeting');
const timezoneElement = document.getElementById('timezone');
const toggleBtn = document.getElementById('format-toggle');

function updateTime() {
    const now = new Date();
    
    // --- Update Greeting ---
    const hour = now.getHours();
    let greeting = 'Good Evening!';
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning!';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon!';
    }
    greetingElement.textContent = greeting;

    // --- Update Time ---
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: !is24HourFormat 
    };
    
    // toLocaleTimeString might include AM/PM in the string.
    let timeString = now.toLocaleTimeString('en-US', timeOptions);
    
    if (!is24HourFormat) {
        // Extract AM/PM and time separately
        const parts = timeString.split(' ');
        clockElement.textContent = parts[0];
        ampmElement.textContent = parts[1];
    } else {
        clockElement.textContent = timeString;
        ampmElement.textContent = ''; // Clear AM/PM for 24H format
    }
    
    // --- Update Date ---
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.textContent = now.toLocaleDateString(undefined, dateOptions);
}

// --- Initialize ---
function init() {
    // Set auto timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneElement.textContent = tz.replace('_', ' ');

    // Handle toggle button
    toggleBtn.addEventListener('click', () => {
        is24HourFormat = !is24HourFormat;
        toggleBtn.textContent = is24HourFormat ? '24H' : '12H';
        updateTime(); // Force immediate update
    });

    // Initial update and start interval
    updateTime();
    setInterval(updateTime, 1000);
}

// Run init when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
