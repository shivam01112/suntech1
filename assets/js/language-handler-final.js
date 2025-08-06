// Final Language Translation Handler - Most Reliable URL Hash Method
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ru,de,el,ar,he',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
    }, 'google_translate_element');
}

// Simple and reliable language change function using URL hash
function changeLanguage(langCode) {
    if (event) {
        event.preventDefault();
    }
    
    // Update active state in UI immediately
    document.querySelectorAll('.lang-option').forEach(function(el) {
        el.classList.remove('active');
    });
    
    var clickedOption = event.target.closest('.lang-option');
    if (clickedOption) {
        clickedOption.classList.add('active');
    }
    
    // Use Google Translate URL hash method - most reliable approach
    if (langCode === 'en') {
        console.log('Resetting to English - clearing all translation data');
        
        // Clear URL hash first
        window.location.hash = '';
        
        // Clear all Google Translate cookies
        clearGoogleTranslateCookies();
        
        // Clear localStorage and sessionStorage
        clearTranslationStorage();
        
        // Force reload to ensure complete reset
        setTimeout(function() {
            window.location.reload(true);
        }, 200);
    } else {
        // Set translation hash and reload for other languages
        window.location.hash = '#googtrans(en|' + langCode + ')';
        window.location.reload();
    }
    
    return false;
}

// Function to clear all Google Translate related cookies
function clearGoogleTranslateCookies() {
    console.log('Clearing Google Translate cookies...');
    
    // List of known Google Translate cookies
    const cookiesToClear = [
        'googtrans',
        'googtransopt', 
        'goog-gt-tt',
        'goog-gt-tl',
        'goog-gt-sl',
        'googtrans(2)',
        '_ga',
        '_gid',
        '_gat'
    ];
    
    // Clear cookies for current domain
    cookiesToClear.forEach(function(cookieName) {
        // Clear for current path
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // Clear for root domain
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
        // Clear for subdomain
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname + ';';
    });
    
    // Clear all cookies that start with 'goog'
    document.cookie.split(';').forEach(function(cookie) {
        var cookieName = cookie.split('=')[0].trim();
        if (cookieName.toLowerCase().indexOf('goog') !== -1) {
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname + ';';
        }
    });
}

// Function to clear translation-related storage
function clearTranslationStorage() {
    console.log('Clearing translation storage...');
    
    try {
        // Clear localStorage items
        if (typeof(Storage) !== "undefined" && localStorage) {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.indexOf('goog') !== -1 || key.indexOf('translate') !== -1)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
        }
        
        // Clear sessionStorage items
        if (typeof(Storage) !== "undefined" && sessionStorage) {
            const sessionKeysToRemove = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key && (key.indexOf('goog') !== -1 || key.indexOf('translate') !== -1)) {
                    sessionKeysToRemove.push(key);
                }
            }
            sessionKeysToRemove.forEach(key => sessionStorage.removeItem(key));
        }
    } catch (e) {
        console.log('Error clearing storage:', e);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load Google Translate script
    var gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.async = true;
    gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(gtScript);
    
    // Check if page is already translated and update UI accordingly
    setTimeout(function() {
        var hash = window.location.hash;
        
        if (hash.includes('googtrans')) {
            // Extract language code from hash
            var matches = hash.match(/googtrans\(en\|([^)]*)\)/);
            if (matches && matches[1]) {
                var langCode = matches[1];
                
                // Update UI to reflect current language
                document.querySelectorAll('.lang-option').forEach(function(el) {
                    el.classList.remove('active');
                    var onclick = el.getAttribute('onclick');
                    if (onclick && onclick.includes("'" + langCode + "'")) {
                        el.classList.add('active');
                    }
                });
            }
        } else {
            // No translation, set English as active
            var englishOption = document.querySelector('.lang-option[onclick*="en"]');
            if (englishOption) {
                englishOption.classList.add('active');
            }
        }
    }, 1000);
});

// Clean up Google Translate UI issues
window.addEventListener('load', function() {
    setTimeout(function() {
        // Hide Google Translate banner
        var banner = document.querySelector('.goog-te-banner-frame');
        if (banner) {
            banner.style.display = 'none';
        }
        
        // Fix body positioning
        document.body.style.top = '0px';
        
        // Hide the original Google Translate widget
        var gtElement = document.getElementById('google_translate_element');
        if (gtElement) {
            gtElement.style.display = 'none';
        }
        
        // Add CSS to prevent layout issues
        var style = document.createElement('style');
        style.innerHTML = `
            .goog-te-banner-frame.skiptranslate { 
                display: none !important; 
            }
            body { 
                top: 0px !important; 
                position: static !important; 
            }
            .goog-text-highlight { 
                background-color: transparent !important; 
                box-shadow: none !important; 
            }
            #google_translate_element {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        
    }, 2000);
});
