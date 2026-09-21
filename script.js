// 365Bus Italia - Main Script

document.addEventListener('DOMContentLoaded', () => {
    // Language translations dictionary
    const translations = {
        it: {
            title: "365Bus Italia - Viaggia in autobus in Italia",
            subtitle: "Trova e confronta i biglietti dell'autobus al miglior prezzo",
            fromPlaceholder: "Partenza (es. Roma, Milano...)",
            toPlaceholder: "Arrivo (es. Firenze, Bologna...)",
            searchBtn: "Cerca Biglietti"
        },
        en: {
            title: "365Bus Italia - Bus Travel in Italy",
            subtitle: "Find and compare bus tickets at the best price",
            fromPlaceholder: "Departure (e.g. Rome, Milan...)",
            toPlaceholder: "Arrival (e.g. Florence, Bologna...)",
            searchBtn: "Search Tickets"
        },
        ar: {
            title: "365Bus Italia - السفر بالحافلات في إيطاليا",
            subtitle: "اعثر على أفضل تذاكر الحافلات وقارن الأسعار بكل سهولة",
            fromPlaceholder: "من (مثال: روما، ميلانو...)",
            toPlaceholder: "إالى (مثال: فلورنسا، بولونيا...)",
            searchBtn: "بحث عن الرحلات"
        }
    };

    // Elements
    const langSelector = document.getElementById('languageSelector');
    const fromInput = document.getElementById('fromInput');
    const toInput = document.getElementById('toInput');
    const dateInput = document.getElementById('dateInput');
    const searchBtn = document.getElementById('searchBtn');

    // Default language set to Italian
    let currentLang = 'it';

    // Function to change language and direction (RTL/LTR)
    function changeLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', lang);
        }

        // Update placeholder texts if elements exist
        if (fromInput) fromInput.placeholder = t.fromPlaceholder;
        if (toInput) toInput.placeholder = t.toPlaceholder;
        if (searchBtn) searchBtn.textContent = t.searchBtn;
    }

    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }

    // Search and redirection logic to Omio (supports all cities dynamically)
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const origin = fromInput ? fromInput.value.trim() : '';
            const destination = toInput ? toInput.value.trim() : '';
            const date = dateInput ? dateInput.value : '';

            if (!origin || !destination) {
                alert(currentLang === 'ar' ? 'يرجى إدخال محطة المغادرة والوصول' : (currentLang === 'it' ? 'Inserisci la stazione di partenza e arrivo' : 'Please enter departure and arrival'));
                return;
            }

            // Construct Omio search URL dynamically with user input and Affiliate tag placeholder
            // Note: You can replace 'YOUR_AFFILIATE_ID' with your actual affiliate tracking code once registered.
            const affiliateId = 'YOUR_AFFILIATE_ID'; 
            let omioUrl = `https://www.omio.it/search-frontend/results?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}`;
            
            if (date) {
                omioUrl += `&date=${date}`;
            }

            // Optional: Append affiliate parameter if provided
            if (affiliateId !== 'YOUR_AFFILIATE_ID') {
                omioUrl += `&affiliate=${affiliateId}`;
            }

            // Redirect user directly to Omio results page
            window.open(omioUrl, '_blank');
        });
    }
});
