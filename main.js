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
    element.style.backgroundColor = 'green';
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const functionName = element.getAttribute('onViewPort');
            if (functionName && typeof window[functionName] === 'function') {
                window[functionName](element);
            }
            observer.unobserve(element);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5
});

document.querySelectorAll('[onViewPort]').forEach(element => {
    observer.observe(element);
});





// Toggle Menu
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