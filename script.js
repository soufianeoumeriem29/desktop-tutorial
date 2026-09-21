const translations = {
    it: {
        heroText: "Muoviti in Italia semplicemente",
        heroSub: "Collega autobus e treni in un unico posto senza stress",
        fromPlaceholder: "Da quale città (Es: Milano, Bologna)",
        toPlaceholder: "A quale città (Es: Roma, Firenze)",
        busLabel: "Autobus",
        trainLabel: "Treno",
        searchBtn: "Cerca il viaggio migliore",
        popularTitle: "Tratte più popolari in Italia"
    },
    en: {
        heroText: "Travel across Italy simply",
        heroSub: "Find buses and trains in one place without complexity",
        fromPlaceholder: "From city (Ex: Milan, Bologna)",
        toPlaceholder: "To city (Ex: Rome, Florence)",
        busLabel: "Bus",
        trainLabel: "Train",
        searchBtn: "Search Best Trip",
        popularTitle: "Most popular routes in Italy"
    },
    ar: {
        heroText: "تنقل في جميع أنحاء إيطاليا بكل بساطة",
        heroSub: "اجمع رحلات الباصات والقطارات في مكان واحد دون تعقيد",
        fromPlaceholder: "من مدينة (مثال: ميلانو، بولونيا)",
        toPlaceholder: "إلى مدينة (مثال: روما، فلورنسا)",
        busLabel: "باص",
        trainLabel: "قطار",
        searchBtn: "ابحث عن أرخص وأسهل رحلة",
        popularTitle: "الخطوط الأكثر طلباً في إيطاليا"
    }
};

function changeLanguage() {
    const lang = document.getElementById('lang-select').value;
    const htmlRoot = document.getElementById('html-root');

    if (lang === 'ar') {
        htmlRoot.setAttribute('dir', 'rtl');
        htmlRoot.setAttribute('lang', 'ar');
    } else {
        htmlRoot.setAttribute('dir', 'ltr');
        htmlRoot.setAttribute('lang', lang);
    }

    document.getElementById('hero-text').innerText = translations[lang].heroText;
    document.getElementById('hero-sub').innerText = translations[lang].heroSub;
    document.getElementById('from-input').placeholder = translations[lang].fromPlaceholder;
    document.getElementById('to-input').placeholder = translations[lang].toPlaceholder;
    document.getElementById('bus-label').innerText = translations[lang].busLabel;
    document.getElementById('train-label').innerText = translations[lang].trainLabel;
    document.getElementById('search-btn-text').innerText = translations[lang].searchBtn;
    document.getElementById('popular-title').innerText = translations[lang].popularTitle;
}

// دالة البحث الأساسية عبر إدخال المدن
document.getElementById('search-btn-text').addEventListener('click', function() {
    const fromCity = document.getElementById('from-input').value.trim();
    const toCity = document.getElementById('to-input').value.trim();
    const travelDate = document.getElementById('date-input').value;

    if (!fromCity || !toCity) {
        alert("يرجى إدخال مدينة المغادرة ومدينة الوصول على الأقل! / Per favore inserisci le città.");
        return;
    }

    const searchUrl = `https://www.omio.it/search-frontend/results?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${travelDate || ''}`;
    window.open(searchUrl, '_blank');
});

// دالة البحث السريع للخطوط الجاهزة الأكثر طلباً
function quickSearch(from, to) {
    const searchUrl = `https://www.omio.it/search-frontend/results?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    window.open(searchUrl, '_blank');
}