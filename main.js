function animateNumbers(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const parentElement = entry.target;

            const elements = parentElement.querySelectorAll('[data-animate-number]');

            elements.forEach(element => {
                const dataValue = element.getAttribute('data-animate-number');
                const [startValue, endValue] = dataValue.split(',').map(Number);

                if (isNaN(startValue) || isNaN(endValue)) {
                    return;
                }

                const duration = 2000;
                let currentValue = parseInt(element.innerText, 10) || 0;
                const steps = duration / 50;
                const increment = (endValue - startValue) / steps;
                let step = 0;

                const interval = setInterval(function () {
                    step++;
                    currentValue = Math.round(startValue + (increment * step));
                    element.innerText = currentValue;

                    if (step >= steps) {
                        clearInterval(interval);
                        element.innerText = endValue;
                    }
                }, 50);
            });

            observer.unobserve(parentElement);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    };

    const observer = new IntersectionObserver(animateNumbers, options);

    const parentElement = document.querySelector("#numeric-details");
    if (parentElement) {
        observer.observe(parentElement);
    }
});


function animateMe(element) {
    console.log("Element is in the viewport!", element);
    element.style.backgroundColor = 'green'; // Example of an animation (background color change)
}

// Intersection Observer Callback
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the element enters the viewport, execute the function in the onViewPort attribute
            const element = entry.target;
            const functionName = element.getAttribute('onViewPort');
            if (functionName && typeof window[functionName] === 'function') {
                window[functionName](element);  // Call the function with the element
            }
            observer.unobserve(element);  // Stop observing the element after it has been triggered
        }
    });
};

// Set up the Intersection Observer with a threshold to trigger when 50% of the element is visible
const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5  // Trigger when 50% of the element is visible
});

// Find all elements with the 'onViewPort' attribute
document.querySelectorAll('[onViewPort]').forEach(element => {
    observer.observe(element); // Start observing each element
});

let menuVisible = true;
let menuElement = document.querySelector('.nav-links');
const toggleMenu = () => {
    console.log('ey');
    menuElement.style.display = menuVisible ? 'flex' : 'none';
    setTimeout(() => {
        menuElement.classList.toggle('-translate-y-8');
    }, 100)
    menuVisible = !menuVisible;
}