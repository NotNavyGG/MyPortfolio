document.addEventListener('mousemove', function(e) {
    const background = document.querySelector('.background');
    background.style.left = e.pageX + 'px';
    background.style.top = e.pageY + 'px';
});

function smoothScrollTo(targetSelector, duration = 2000) {
    const target = document.querySelector(targetSelector);
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function smoothScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        window.scrollTo(0, startPosition + (distance * easeInOutQuad(progress)));

        if (progress < 1) {
            requestAnimationFrame(smoothScroll);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(smoothScroll);
}

// Apply smooth scrolling to both buttons
document.querySelector('.scroll-down').addEventListener('click', function() {
    smoothScrollTo('#page2', 2500); // Slower scroll effect
});

document.querySelector('.about').addEventListener('click', function() {
    smoothScrollTo('#page2', 2000); // Normal speed scroll
});

// Hide background smoothly when entering page2
window.addEventListener('scroll', function() {
    const page2 = document.querySelector('#page2');
    const background = document.querySelector('.background');
    const page2Position = page2.getBoundingClientRect().top;

    if (page2Position < window.innerHeight / 2) {
        background.style.opacity = '0'; // Fade out
        background.style.pointerEvents = 'none';
    } else {
        background.style.opacity = '1'; // Fade in when scrolling back up
        background.style.pointerEvents = 'auto';
    }
});
