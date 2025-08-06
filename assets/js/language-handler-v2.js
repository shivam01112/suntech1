// Alternative Language Translation Handler - Direct Method
var googleTranslateConfig = {
    pageLanguage: 'en',
    includedLanguages: 'en,ar,de,el,he,ru,es,fr,it,pt,zh',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
};

function googleTranslateElementInit() {
    new google.translate.TranslateElement(googleTranslateConfig, 'google_translate_element');
}

// More robust translate function
function translatePage(langCode) {
    if (event) {
        event.preventDefault();
    }
    
    // Update UI
    document.querySelectorAll('.lang-option').forEach(function(el) {
        el.classList.remove('active');
    });
    
    var clickedOption = event.target.closest('.lang-option');
    if (clickedOption) {
        clickedOption.classList.add('active');
    }
    
    // Direct translation using Google Translate API
    function performTranslation() {
        // Method 1: Use the select element directly
        var selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
            // Find the correct option value
            var options = selectElement.getElementsByTagName('option');
            for (var i = 0; i < options.length; i++) {
                if (options[i].value === langCode) {
                    selectElement.selectedIndex = i;
                    selectElement.value = langCode;
                    
                    // Trigger multiple events to ensure translation
                    var events = ['change', 'click', 'input'];
                    events.forEach(function(eventType) {
                        var evt = document.createEvent('HTMLEvents');
                        evt.initEvent(eventType, true, true);
                        selectElement.dispatchEvent(evt);
                    });
                    
                    return true;
                }
            }
        }
        
        // Method 2: Try to trigger using Google's internal methods
        if (window.google && window.google.translate) {
            try {
                // Try to access Google Translate's internal translation function
                var translateElement = window.google.translate.TranslateElement;
                if (translateElement) {
                    // Force a retranslation
                    window.location.hash = '#googtrans(' + googleTranslateConfig.pageLanguage + '|' + langCode + ')';
                    window.location.reload();
                    return true;
                }
            } catch (e) {
                console.log('Method 2 failed:', e);
            }
        }
        
        return false;
    }
    
    // Try immediate translation
    if (!performTranslation()) {
        // Wait and try again
        setTimeout(function() {
            if (!performTranslation()) {
                // Last resort: trigger Google Translate widget and then translate
                var gtButton = document.querySelector('.goog-te-gadget-simple');
                if (gtButton) {
                    // Simulate click to ensure Google Translate is fully loaded
                    gtButton.click();
                    setTimeout(performTranslation, 1000);
                }
            }
        }, 500);
    }
    
    return false;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set default active language
    setTimeout(function() {
        var englishOption = document.querySelector('.lang-option[onclick*="en"]');
        if (englishOption) {
            englishOption.classList.add('active');
        }
    }, 100);
    
    // Load Google Translate
    if (!window.google || !window.google.translate) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.head.appendChild(script);
    }
    
    // Clean up Google Translate UI
    setTimeout(function() {
        // Hide banner
        var banner = document.querySelector('.goog-te-banner-frame');
        if (banner) {
            banner.style.display = 'none';
        }
        
        // Fix body positioning
        document.body.style.top = '0px';
        
        // Hide original Google Translate dropdown if it's visible
        var originalGT = document.querySelector('#google_translate_element');
        if (originalGT) {
            originalGT.style.display = 'none';
        }
        
    }, 2000);
});

// URL hash handling for direct translation
window.addEventListener('load', function() {
    // Check if there's a translation hash in URL
    var hash = window.location.hash;
    if (hash.includes('googtrans')) {
        // Extract language code
        var matches = hash.match(/googtrans\([^|]*\|([^)]*)\)/);
        if (matches && matches[1]) {
            var langCode = matches[1];
            // Update UI to reflect the current language
            document.querySelectorAll('.lang-option').forEach(function(el) {
                el.classList.remove('active');
                var onclick = el.getAttribute('onclick');
                if (onclick && onclick.includes("'" + langCode + "'")) {
                    el.classList.add('active');
                }
            });
        }
    }
});

// Prevent Google Translate styling issues
(function() {
    var style = document.createElement('style');
    style.innerHTML = `
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);
})();
