document.addEventListener('DOMContentLoaded', function () {
  const pagesDropdown = document.getElementById('pagesDropdown');
    
    if (pagesDropdown) {
        const dropdownToggle = pagesDropdown.querySelector('.dropdown-toggle');
        
        dropdownToggle.addEventListener('click', function (event) {
            event.preventDefault();
            pagesDropdown.classList.toggle('active');
            event.stopPropagation();
        });

       
        document.addEventListener('click', function (event) {
            
            if (!pagesDropdown.contains(event.target)) {
                
                pagesDropdown.classList.remove('active');
            }
        });
    }


const themeToggle = document.getElementById('themeToggle');
const body = document.body;


function updateIllustrations(isDarkMode) {
    
    const illustrations = document.querySelectorAll('[data-dark-src]');

    illustrations.forEach(img => {
        const lightSrc = img.getAttribute('data-light-src');
        const darkSrc = img.getAttribute('data-dark-src');
        
        if (isDarkMode && darkSrc) {
            img.src = darkSrc;
        } else if (lightSrc) {
            img.src = lightSrc;
        }
    });
}


function applyTheme(theme) {
    const isDarkMode = theme === 'dark';

    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        themeToggle.title = 'Switch to light theme';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
        themeToggle.title = 'Switch to dark theme';
    }
    
    
    updateIllustrations(isDarkMode);
}


const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let initialTheme = 'light';

if (savedTheme) {
    initialTheme = savedTheme;
} else if (prefersDark) {
    initialTheme = 'dark';
}

applyTheme(initialTheme);



if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        const isDarkMode = body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';

        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
    
    const searchToggle = document.querySelector('.search-icon'); 
    const searchOverlay = document.getElementById('searchOverlay');

    if (searchToggle && searchOverlay) {
        
        searchToggle.addEventListener('click', function () {
            searchOverlay.classList.add('active');
            
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        });

       
        searchOverlay.addEventListener('click', function (event) {
           
            if (event.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });

       
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });
    }
});