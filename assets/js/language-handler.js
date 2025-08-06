// Enhanced Language Translation Handler
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ar,de,el,he,ru,es,fr,it,pt,zh',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
    }, 'google_translate_element');
}

// Custom translate function for beautiful language selector
function translatePage(langCode) {
    // Prevent default action
    if (event) {
        event.preventDefault();
    }
    
    // Update active state
    document.querySelectorAll('.lang-option').forEach(function(el) {
        el.classList.remove('active');
    });
    
    // Add active class to clicked option
    var clickedOption = event.target.closest('.lang-option');
    if (clickedOption) {
        clickedOption.classList.add('active');
    }
    
    // Function to actually trigger translation
    function doTranslate() {
        // Method 1: Try to find and click the correct option in Google Translate dropdown
        var gtSelect = document.querySelector('.goog-te-combo');
        if (gtSelect) {
            // Set the value and trigger change
            gtSelect.value = langCode;
            
            // Create and dispatch a change event
            var event = new Event('change', { bubbles: true });
            gtSelect.dispatchEvent(event);
            
            // Also try triggering with jQuery if available
            if (window.jQuery) {
                jQuery(gtSelect).val(langCode).trigger('change');
            }
            
            return true;
        }
        
        // Method 2: Try alternative Google Translate selectors
        var gtSelect2 = document.querySelector('#google_translate_element select');
        if (gtSelect2) {
            gtSelect2.value = langCode;
            var event = new Event('change', { bubbles: true });
            gtSelect2.dispatchEvent(event);
            return true;
        }
        
        // Method 3: Try to simulate clicking on Google Translate options
        var gtOptions = document.querySelectorAll('.goog-te-menu2-item span');
        for (var i = 0; i < gtOptions.length; i++) {
            var option = gtOptions[i];
            if (option.textContent.includes(getLanguageName(langCode))) {
                option.click();
                return true;
            }
        }
        
        return false;
    }
    
    // Helper function to get language names
    function getLanguageName(code) {
        var languages = {
            'en': 'English',
            'ar': 'Arabic',
            'de': 'German',
            'el': 'Greek',
            'he': 'Hebrew',
            'ru': 'Russian',
            'es': 'Spanish',
            'fr': 'French',
            'it': 'Italian',
            'pt': 'Portuguese',
            'zh': 'Chinese'
        };
        return languages[code] || code;
    }
    
    // Try translation immediately
    if (!doTranslate()) {
        // If immediate translation fails, wait a bit and try again
        setTimeout(function() {
            if (!doTranslate()) {
                // If still failing, try to initialize Google Translate first
                var gtWidget = document.querySelector('.goog-te-gadget-simple');
                if (gtWidget) {
                    gtWidget.click();
                    setTimeout(function() {
                        doTranslate();
                    }, 500);
                }
            }
        }, 1000);
    }
    
    return false;
}

// Initialize language selector
document.addEventListener('DOMContentLoaded', function() {
    // Set English as active by default
    var englishOption = document.querySelector('.lang-option[onclick*="en"]');
    if (englishOption) {
        englishOption.classList.add('active');
    }
    
    // Load Google Translate script
    var gt = document.createElement('script');
    gt.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    gt.type = "text/javascript";
    gt.async = true;
    document.head.appendChild(gt);
    
    // Wait for Google Translate to load
    setTimeout(function() {
        // Hide Google Translate branding
        var banner = document.querySelector('.goog-te-banner-frame');
        if (banner) {
            banner.style.display = 'none';
        }
        
        // Reset body positioning
        document.body.style.top = '0px';
        
        // Monitor for Google Translate changes
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // Check if Google Translate select element was added
                    var combo = document.querySelector('.goog-te-combo');
                    if (combo && !combo.hasAttribute('data-listener-added')) {
                        combo.setAttribute('data-listener-added', 'true');
                        
                        // Listen for changes to sync our UI
                        combo.addEventListener('change', function() {
                            var selectedLang = combo.value;
                            
                            // Update our custom dropdown to reflect the change
                            document.querySelectorAll('.lang-option').forEach(function(el) {
                                el.classList.remove('active');
                                var onclick = el.getAttribute('onclick');
                                if (onclick && onclick.includes("'" + selectedLang + "'")) {
                                    el.classList.add('active');
                                }
                            });
                        });
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
    }, 3000);
});

// Prevent Google Translate from adding top margin to body
window.addEventListener('load', function() {
    setTimeout(function() {
        document.body.style.top = '0px';
        
        // Add CSS to prevent Google Translate layout issues
        var style = document.createElement('style');
        style.innerHTML = `
            body { top: 0px !important; }
            .goog-te-banner-frame { display: none !important; }
            .goog-text-highlight { background: none !important; box-shadow: none !important; }
        `;
        document.head.appendChild(style);
    }, 1000);
});
