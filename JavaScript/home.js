// Select all video containers
const videoContainers = document.querySelectorAll('.video-container');

// Loop through each container to add event listeners
videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const thumbnail = container.querySelector('.thumbnail');

    // Play video when thumbnail is clicked
    thumbnail.addEventListener('click', () => {
        thumbnail.classList.add('hide');  // Hide thumbnail
        video.style.display = 'block';    // Show video
        video.play();                     // Play video
    });

    // Pause video and show thumbnail when video is clicked
    video.addEventListener('click', () => {
        video.pause();                    // Pause video
        video.style.display = 'none';     // Hide video
        thumbnail.classList.remove('hide'); // Show thumbnail
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

// Toggle menu visibility when hamburger is clicked
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show'); // Toggle the 'show' class to display/hide menu
});




// || TIMER

// Set JAMB exam date
const jambDate = new Date('April 20, 2025 00:00:00');
const today = new Date();

function updateCountdown() {
    const now = new Date();
    const timeDiff = jambDate - now;

    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById('months').innerText = months;
    document.getElementById('weeks').innerText = weeks;
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}

// Create calendar days
function createCalendar(monthElement, month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysContainer = monthElement.querySelector('.days');
    daysContainer.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        const className =
            dayDate < today
                ? 'day-lost'
                : dayDate > jambDate
                    ? ''
                    : 'day-left';
        daysContainer.innerHTML += `<div class="${className}">${day}</div>`;
    }
}

// Initialize calendar
function initCalendar() {
    const months = ['january', 'february', 'march', 'april'];
    const currentYear = today.getFullYear();

    months.forEach((month, index) => {
        const monthElement = document.getElementById(month);
        createCalendar(monthElement, index, currentYear);
    });
}

// Update countdown and calendar
setInterval(updateCountdown, 1000);
initCalendar();





// PUSH NOTIFICATIONS

// Check if the browser supports notifications
if ("Notification" in window) {
    // Function to request permission for push notifications
    function requestNotificationPermission() {
        // Check the current permission status
        if (Notification.permission === "default") {
            // Ask the user for permission
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                    // Optionally, you can handle the logic to subscribe to push notifications here
                } else {
                    console.log("Notification permission denied.");
                }
            });
        } else if (Notification.permission === "granted") {
            console.log("Notification permission already granted.");
        } else {
            console.log("Notification permission denied previously.");
        }
    }

    // Trigger the notification permission request when the page loads
    window.onload = function() {
        requestNotificationPermission();
    };
} else {
    console.log("This browser does not support notifications.");
}
