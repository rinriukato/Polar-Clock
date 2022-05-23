setInterval(updateClock, 1000);

window.addEventListener('resize', init());

//Initializations
function init() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Resize canvas to full screen
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

function dayToString(day) {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return days[day];
}

function monthToString(month) {
	const months = ['January', 'Feburary', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November', 'December'];
	return months[month];
}

function nth(date) {
    if (d > 3 && d < 21) return "th";

    switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}


function updateClock() {
    const canvas = document.getElementById('canvas');
    const secOverlay = document.getElementById('seconds');
    const minOverlay = document.getElementById('minutes');
    const hourOverlay = document.getElementById('hours');
    const dayOverlay = document.getElementById('days');
    const dateOverlay = document.getElementById('date');
    const monthOverlay = document.getElementById('months');
    const yearOverlay = document.getElementById('year');

    const ctx = canvas.getContext('2d');
    const currentDate = new Date();
    const seconds = currentDate.getSeconds();
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();
    const day = currentDate.getDay();
    const date = currentDate.getDate();
	const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    ctx.clearRect(0,0, window.innerWidth, window.innerWidth); // Clear canvas

    // Update seconds wheel
	draw(ctx, '#FD9162', 400, seconds / 60);
    setRotation(secOverlay, seconds / 60);
    secOverlay.textContent = seconds + " seconds";

    // Update minute wheel
	draw(ctx, '#FFBA38', 350, minutes / 60);
    setRotation(minOverlay, minutes / 60);
    minOverlay.textContent = minutes + " minutes";

    // Update hours wheel
	draw(ctx, '#FFDF63', 300, hours / 24);
    setRotation(hourOverlay, hours / 24);
    hourOverlay.textContent = hours + " hours"

    // Update days wheel
	draw(ctx, '#FD5740', 200, day / 7);
    setRotation(dayOverlay, day / 7);
    dayOverlay.textContent = dayToString(day);

    // Update date wheel
    draw(ctx, '#E73B41', 150, date / 31 );
    setRotation(dateOverlay, date / 31);
    dateOverlay.textContent = date;

    // Update months wheel
	draw(ctx, '#B43692', 100, month / 12);
    setRotation(monthOverlay, month / 12);
    monthOverlay.textContent = monthToString(month);

    // Update year
    yearOverlay.textContent = year;
}

function draw(ctx, color,radius, timeRatio) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc((window.innerWidth / 2),            // X Position
            (window.innerHeight / 2),           // Y Position
            radius,                             // Radius of Circle
            (2 * Math.PI) * timeRatio,          // Position of where circle starts (Right side)
            (2 * Math.PI),                      // Circle Ends
            true);
    ctx.lineWidth = 50;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function setRotation(element, rotation) {
    element.style.setProperty('--rotation', rotation * 360);
}


init();
updateClock();
