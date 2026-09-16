function updateTime() {
    const now = new Date();
    
    // Time formatting
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    };
    const timeString = now.toLocaleTimeString(undefined, timeOptions);
    
    // Date formatting
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString(undefined, dateOptions);

    // Update DOM
    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

// Initial call
updateTime();

// Update every second
setInterval(updateTime, 1000);
