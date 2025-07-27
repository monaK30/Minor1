// intialize on page load 
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileMenu();
    initializeContactForm();
    initializeLoginForm();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const body = document.body;
    
    // if user chose dark theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        updateThemeIcons('dark');
    }

    // add click event to theme toggle 
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
//switch between light and dark
    function toggleTheme() {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark ? 'dark' : 'light');
    }
    //update icons
     function updateThemeIcons(theme) {
        const icons = document.querySelectorAll('.theme-icon');
        icons.forEach(icon => {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        });
    }
}

// Mobile Menu Management
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    //toggle menu on button click
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('open');
            mobileNav.classList.toggle('open');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('.nav-link-mobile');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('open');
                mobileNav.classList.remove('open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileMenuBtn.classList.remove('open');
                mobileNav.classList.remove('open');
            }
        });
    }
}

// Contact Form Management
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const emailInput = contactForm.querySelector('input[name="email"]');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Real-time email validation
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                validateEmail(this);
            });
        }

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmit(this);
        });
    }
}

function validateEmail(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(emailInput.value);
    const errorElement = emailInput.parentNode.querySelector('.form-error');
    
    // Remove existing error
    if (errorElement) {
        errorElement.remove();
    }

    if (emailInput.value && !isValid) {
        emailInput.style.borderColor = 'var(--destructive)';
        const error = document.createElement('div');
        error.className = 'form-error';
        error.textContent = 'Please enter a valid email address';
        emailInput.parentNode.appendChild(error);
        return false;
    } else {
        emailInput.style.borderColor = 'var(--border)';
        return true;
    }
}

function handleContactSubmit(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const emailInput = form.querySelector('input[name="email"]');
    
    // Validate required fields
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Validate email
    if (!validateEmail(emailInput)) {
        return;
    }

    // Simulate form submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <span class="btn-icon">→</span>';
        
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
    }, 1500);
}

// Login Form Management
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        const toggleModeBtn = document.getElementById('toggleMode');
        const passwordToggles = document.querySelectorAll('.password-toggle');
        
        // Mode toggle (login/signup)
        if (toggleModeBtn) {
            toggleModeBtn.addEventListener('click', function() {
                toggleLoginMode();
            });
        }

        // Password visibility toggles
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const input = this.parentNode.querySelector('input');
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                this.textContent = type === 'password' ? '👁️' : '🙈';
            });
        });

        // Form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLoginSubmit(this);
        });
    }
}

function toggleLoginMode() {
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const emailGroup = document.getElementById('emailGroup');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const submitBtn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleText');
    const toggleLink = document.getElementById('toggleMode');
    const forgotPassword = document.getElementById('forgotPassword');
    
    const isLogin = formTitle.textContent.includes('Welcome');
    
    if (isLogin) {
        // Switch to signup mode
        formTitle.textContent = 'Create Account';
        formSubtitle.textContent = 'Join the Nams Couture community';
        emailGroup.style.display = 'block';
        confirmPasswordGroup.style.display = 'block';
        submitBtn.textContent = 'Create Account';
        toggleText.textContent = 'Already have an account?';
        toggleLink.textContent = 'Sign in';
        if (forgotPassword) forgotPassword.style.display = 'none';
    } else {
        // Switch to login mode
        formTitle.textContent = 'Welcome Back';
        formSubtitle.textContent = 'Sign in to your Nams Couture account';
        emailGroup.style.display = 'none';
        confirmPasswordGroup.style.display = 'none';
        submitBtn.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
        toggleLink.textContent = 'Sign up';
        if (forgotPassword) forgotPassword.style.display = 'block';
    }
}

function handleLoginSubmit(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const isLogin = submitBtn.textContent === 'Sign In';
    
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validation
    if (isLogin) {
        if (!username || !password) {
            showNotification('Please enter both username and password.', 'error');
            return;
        }
    } else {
        if (!username || !email || !password || !confirmPassword) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match.', 'error');
            return;
        }
    }

    // Simulate authentication
    submitBtn.disabled = true;
    submitBtn.textContent = isLogin ? 'Signing in...' : 'Creating account...';

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = isLogin ? 'Sign In' : 'Create Account';
        
        const message = isLogin ? 
            'Welcome back! You have been successfully logged in.' : 
            'Account created successfully! Welcome to Nams Couture.';
            
        showNotification(message, 'success');
        form.reset();
    }, 1500);
}

// limit function execution rate 
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add slideInRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);


