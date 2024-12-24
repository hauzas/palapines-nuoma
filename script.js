let lastScrollY = 0; // Keep track of the last scroll position
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down: hide the navbar
        navbar.classList.add('hidden');
    } else {
        // Scrolling up: show the navbar
        navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
});

// Get all toggle buttons
const toggleButtons = document.querySelectorAll('.toggle-btn');

// Add event listeners to each button
toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
        const menuList = this.nextElementSibling; // Get the corresponding menu list
        menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block'; // Toggle visibility

        // Change button text
        if (menuList.style.display === 'block') {
            this.textContent = 'Hide Menu';
            this.classList.add('active');
        } else {
            this.textContent = 'Show Menu';
            this.classList.remove('active');
        }
    });
});

const hamburger = document.querySelector('.hamburger');
const dropdownMenu = document.querySelector('.dropdown-menu');
const menuLinks = document.querySelectorAll('.dropdown-menu a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // Toggle the X icon
    dropdownMenu.classList.toggle('show'); // Toggle the dropdown menu visibility
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active'); // Reset hamburger to its default state
        dropdownMenu.classList.remove('show'); // Close the dropdown menu
    });
});

// Select all menu containers and menu images
const menuContainers = document.querySelectorAll('.menu-container');
const menuImages = document.querySelectorAll('.menu-image img');

// Function to handle scroll-based animation for both containers and images
const handleScrollAnimations = () => {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Animate menu containers (instant appearance)
    menuContainers.forEach((container) => {
        const rect = container.getBoundingClientRect();

        // Check if the container is in view
        if (rect.top < windowHeight && rect.bottom > 100) {
            container.style.opacity = 1; // Fully visible
            container.style.transform = 'translateY(0)'; // Reset position
        } else {
            // Reset when out of view
            container.style.opacity = 0;
            container.style.transform = 'translateY(30px)';
        }
    });

    // Animate menu images (gradual appearance)
    menuImages.forEach((image) => {
        const rect = image.getBoundingClientRect();

        // Check if the image is in view
        if (rect.top < windowHeight && rect.bottom > 0) {
            const visibilityRatio = Math.min(1, (windowHeight - rect.top) / windowHeight + 0.25);

            // Gradually adjust styles based on visibility ratio
            image.style.opacity = visibilityRatio; // Adjust opacity
            image.style.transform = `scale(${0.95 + 0.05 * visibilityRatio})`; // Scale up slightly
        } else {
            // Reset styles when the image is out of view
            image.style.opacity = 0;
            image.style.transform = 'scale(0.95)';
        }
    });
};

// Listen for scroll events
window.addEventListener('scroll', handleScrollAnimations);

// Trigger once on page load
handleScrollAnimations();
