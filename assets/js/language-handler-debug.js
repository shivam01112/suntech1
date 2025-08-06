// Enhanced Language Translation Handler - Debug Version
function googleTranslateElementInit() {
    console.log('🌐 Google Translate initializing...');
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ar,de,el,he,ru,es,fr,it,pt,zh',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
    }, 'google_translate_element');
    
    console.log('✅ Google Translate element created');
}

// Custom translate function for beautiful language selector
function translatePage(langCode) {
    console.log('🔄 Translation requested for language:', langCode);
    
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
        console.log('✅ Active language updated in UI');
    }
    
    // Wait for Google Translate to be ready and trigger translation
    function triggerTranslation() {
        console.log('🔍 Looking for Google Translate elements...');
        
        // Try multiple methods to trigger Google Translate
        var selectElement = document.querySelector('#google_translate_element select');
        var comboElement = document.querySelector('.goog-te-combo');
        
        if (selectElement) {
            console.log('✅ Found Google Translate select element');
            selectElement.value = langCode;
            selectElement.dispatchEvent(new Event('change'));
            console.log('🚀 Translation triggered via select element');
        } else if (comboElement) {
            console.log('✅ Found Google Translate combo element');
            comboElement.value = langCode;
            comboElement.dispatchEvent(new Event('change'));
            console.log('🚀 Translation triggered via combo element');
        } else {
            console.log('⏳ Google Translate elements not ready, retrying...');
            setTimeout(triggerTranslation, 500);
        }
    }
    
    // Start translation attempt
    triggerTranslation();
    
    // Also try using Google Translate's API directly if available
    if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
        console.log('🔧 Google Translate API is available');
        setTimeout(function() {
            var iframe = document.querySelector('.goog-te-menu-frame');
            if (!iframe) {
                console.log('🖱️ Trying to click Google Translate widget to initialize...');
                var gtWidget = document.querySelector('#google_translate_element .goog-te-gadget-simple');
                if (gtWidget) {
                    gtWidget.click();
                    setTimeout(function() {
                        triggerTranslation();
                    }, 100);
                }
            } else {
                console.log('✅ Google Translate menu frame found');
                triggerTranslation();
            }
        }, 100);
    } else {
        console.log('⚠️ Google Translate API not yet available');
    }
    
    return false;
}

// Initialize language selector
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded, initializing language selector...');
    
    // Set English as active by default
    var englishOption = document.querySelector('.lang-option[onclick*="en"]');
    if (englishOption) {
        englishOption.classList.add('active');
        console.log('✅ English set as default active language');
    }
    
    // Load Google Translate script
    console.log('📡 Loading Google Translate script...');
    var gt = document.createElement('script');
    gt.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    gt.type = "text/javascript";
    gt.async = true;
    
    gt.onload = function() {
        console.log('✅ Google Translate script loaded successfully');
    };
    
    gt.onerror = function() {
        console.error('❌ Failed to load Google Translate script');
    };
    
    document.head.appendChild(gt);
    
    // Wait for Google Translate to load and then ensure proper integration
    setTimeout(function() {
        console.log('🔍 Checking Google Translate integration...');
        
        // Hide Google Translate branding when it loads
        var banner = document.querySelector('.goog-te-banner-frame');
        if (banner) {
            banner.style.display = 'none';
            console.log('✅ Google Translate banner hidden');
        }
        
        // Reset body top positioning that Google Translate adds
        document.body.style.top = '0px';
        console.log('✅ Body positioning reset');
        
        // Check if Google Translate element is properly initialized
        var gtElement = document.getElementById('google_translate_element');
        var selectElement = document.querySelector('#google_translate_element select');
        
        if (gtElement && selectElement) {
            console.log('✅ Google Translate fully initialized and ready');
        } else if (gtElement) {
            console.log('⏳ Google Translate element found but not fully ready');
        } else {
            console.log('❌ Google Translate element not found');
        }
        
        // Monitor for Google Translate combo changes to update our UI
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    var combo = document.querySelector('.goog-te-combo');
                    if (combo && !combo.hasAttribute('data-listener-added')) {
                        combo.setAttribute('data-listener-added', 'true');
                        console.log('🔗 Added change listener to Google Translate combo');
                        
                        combo.addEventListener('change', function() {
                            var selectedLang = combo.value;
                            console.log('🌐 Language changed to:', selectedLang);
                            
                            // Update our custom dropdown to reflect the change
                            document.querySelectorAll('.lang-option').forEach(function(el) {
                                el.classList.remove('active');
                                if (el.getAttribute('onclick').includes(selectedLang)) {
                                    el.classList.add('active');
                                    console.log('✅ UI updated to reflect language change');
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
        if (document.body.style.top) {
            document.body.style.top = '0px';
            console.log('🔧 Removed Google Translate body margin');
        }
        
        // Force remove any Google Translate top margin
        var style = document.createElement('style');
        style.innerHTML = 'body { top: 0px !important; }';
        document.head.appendChild(style);
        console.log('✅ Applied body positioning fix');
    }, 1000);
});
