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





// let paths = {
//     middleLine: document.getElementById('middleLine'),
//     burger: {
//         line_1: `M17 16H10`,
//         line_2: `M17 12H13`,
//         line_3: `M17 8H8`
//     },
//     closeIcon: {
//         line_1: `M17 16H10`,
//         line_2: `M17 12H13`,
//         line_3: `M17 8H8`
//     }
// }
// paths.middleLine.style.setAttribute;


// Toggle Menu
let menuVisible = true;
let menuElement = document.querySelector('.nav-links');
const toggleMenu = () => {
    const paths = document.querySelectorAll('.menu-icon path');
    menuElement.style.display = menuVisible ? 'flex' : 'none';
    if (!menuVisible) {
        paths[0].setAttribute('d', 'M1 1L26 1');
        paths[1].setAttribute('d', 'M26 9L11 9');
        paths[1].classList.toggle('duration-300');
        paths[1].classList.toggle('transition-all');
        paths[2].setAttribute('d', 'M26 17L6 17');
    } else {
        paths[0].setAttribute('d', 'M25 1L6 17');

        paths[1].setAttribute('d', '0');
        paths[1].classList.toggle('duration-300');
        paths[1].classList.toggle('transition-all');

        paths[2].setAttribute('d', 'M25 17L6 1');
    }
    setTimeout(() => {
        menuElement.classList.toggle('-translate-y-4');
        menuElement.classList.toggle('max-md:opacity-100');
    }, 100)
    menuVisible = !menuVisible;
}