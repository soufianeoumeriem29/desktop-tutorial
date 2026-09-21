// 365Bus Italia - Main Script with Autocomplete

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

    // Popular Italian cities list for autocomplete
    const italianCities = [
        "Roma", "Milano", "Napoli", "Torino", "Firenze", 
        "Bologna", "Venezia", "Verona", "Palermo", "Genova", 
        "Bari", "Catania", "Bologna Centrale", "Roma Termini", "Milano Centrale"
    ];

    // Function to setup autocomplete for inputs
    function setupAutocomplete(inputElement) {
        if (!inputElement) return;

        // Create dropdown container
        const listContainer = document.createElement('div');
        listContainer.className = 'autocomplete-list';
        listContainer.style.position = 'absolute';
        listContainer.style.background = '#1e293b';
        listContainer.style.border = '1px solid #334155';
        listContainer.style.borderRadius = '0.5rem';
        listContainer.style.zIndex = '1000';
        listContainer.style.width = inputElement.offsetWidth + 'px';
        listContainer.style.maxHeight = '150px';
        listContainer.style.overflowY = 'auto';
        listContainer.style.display = 'none';
        
        inputElement.parentNode.style.position = 'relative';
        inputElement.parentNode.appendChild(listContainer);

        inputElement.addEventListener('input', () => {
            const value = inputElement.value.trim().toLowerCase();
            listContainer.innerHTML = '';
            
            if (!value) {
                listContainer.style.display = 'none';
                return;
            }

            const filteredCities = italianCities.filter(city => city.toLowerCase().includes(value));

            if (filteredCities.length > 0) {
                listContainer.style.display = 'block';
                filteredCities.forEach(city => {
                    const item = document.createElement('div');
                    item.textContent = city;
                    item.style.padding = '10px 15px';
                    item.style.cursor = 'pointer';
                    item.style.color = '#fff';
                    item.style.borderBottom = '1px solid #334155';
                    
                    item.addEventListener('mouseover', () => {
                        item.style.background = '#3b82f6';
                    });
                    item.addEventListener('mouseout', () => {
                        item.style.background = 'transparent';
                    });

                    item.addEventListener('click', () => {
                        inputElement.value = city;
                        listContainer.style.display = 'none';
                    });

                    listContainer.appendChild(item);
                });
            } else {
                listContainer.style.display = 'none';
            }
        });

        // Hide list when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target !== inputElement) {
                listContainer.style.display = 'none';
            }
        });
    }

    // Apply autocomplete to inputs
    setupAutocomplete(fromInput);
    setupAutocomplete(toInput);

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

        if (fromInput) fromInput.placeholder = t.fromPlaceholder;
        if (toInput) toInput.placeholder = t.toPlaceholder;
        if (searchBtn) searchBtn.textContent = t.searchBtn;
    }

    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }

    // Search and redirection logic to Omio
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

            const affiliateId = 'YOUR_AFFILIATE_ID'; 
            let omioUrl = `https://www.omio.it/search-frontend/results?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}`;
            
            if (date) {
                omioUrl += `&date=${date}`;
            }

            if (affiliateId !== 'YOUR_AFFILIATE_ID') {
                omioUrl += `&affiliate=${affiliateId}`;
            }

            window.open(omioUrl, '_blank');
        });
    }
});
