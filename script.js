// ============ Cart Functionality ============
let cart = [];
let cartCount = 0;

function updateCartCount() {
    const cartCounter = document.querySelector('.cart-count') || createCartCounter();
    cartCounter.textContent = cartCount;
}

function createCartCounter() {
    const counter = document.createElement('span');
    counter.className = 'cart-count';
    counter.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--menu-color);
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
    `;
    return counter;
}

function addToCart(itemName, price = 0) {
    cart.push({ name: itemName, price: price });
    cartCount++;
    updateCartCount();

    // Show feedback
    showNotification(`${itemName} added to cart!`);

    // Animate button
    event.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
    }, 150);
}

// ============ Search Functionality ============
function searchFood() {
    const query = document.querySelector('.search-bar input').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ============ Modal Functionality ============
function openModal() {
    // Modal removed - login is now on separate page
}

function closeModal() {
    // Modal removed - login is now on separate page
}

// ============ Notification System ============
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--menu-color);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ Smooth Scrolling ============
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============ Animation on Load ============
function animateOnLoad() {
    const elements = document.querySelectorAll('.card, .category, .hero-content');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ============ Event Listeners ============
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart counter
    updateCartCount();

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.card button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.parentElement.querySelector('h3').textContent;
            addToCart(itemName);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', searchFood);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchFood();
            }
        });
    }

    // Modal functionality removed - login is now on separate page
    // const loginLink = document.querySelector('.user a');
    // const closeBtn = document.querySelector('.close');

    // if (loginLink) {
    //     loginLink.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         openModal();
    //     });
    // }

    // if (closeBtn) {
    //     closeBtn.addEventListener('click', closeModal);
    // }

    // // Close modal on outside click
    // window.addEventListener('click', function(e) {
    //     const modal = document.querySelector('.modal');
    //     if (e.target === modal) {
    //         closeModal();
    //     }
    // });

    // Animate on load
    animateOnLoad();

    // Search functionality
    const searchButton = document.querySelector('.search-bar button');
    if (searchButton) {
        searchButton.addEventListener('click', searchFood);
    }

    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchFood();
            }
        });
    }
});

// ============ CSS Animations for JS ============
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============ Login and Hamburger Menu ============
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedIn') === 'true') {
        // Hide login link, show hamburger
        const userDiv = document.querySelector('.user');
        if (userDiv) {
            userDiv.innerHTML = '<div class="hamburger" id="hamburger"><i class="fas fa-bars"></i></div>';
        }

        // Add sidebar
        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        sidebar.id = 'sidebar';
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <h3>Menu</h3>
                <i class="fas fa-times" id="closeSidebar"></i>
            </div>
            <ul class="sidebar-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="menu.html">Our Menu</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            </ul>
        `;
        document.body.appendChild(sidebar);

        // Event listeners
        document.getElementById('hamburger').addEventListener('click', function() {
            sidebar.classList.add('active');
        });

        document.getElementById('closeSidebar').addEventListener('click', function() {
            sidebar.classList.remove('active');
        });

        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('loggedIn');
            location.reload();
        });
    }
});