// Example of a simple script to handle any interactive elements (if any)
// You could include additional interactivity if needed for example buttons that show/hide details or
// display a success message after downloading
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        alert("Your download will begin shortly.");
    });
});
