// RentCar - Yagona API Konfiguratsiyasi
(function () {
    let baseUrl = 'https://rentcar-backend-dnq1.onrender.com';

    // Agar lokal muhitda (localhost yoki 127.0.0.1) ishlayotgan bo'lsa:
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.protocol === 'file:';

    if (isLocal) {
        // Agar to'g'ridan-to'g'ri Express serveri portida (10000) ochilgan bo'lsa
        if (window.location.port === '10000') {
            baseUrl = '';
        } else {
            // Live Server (masalan 5500) yoki fayl tizimi orqali ochilgan bo'lsa
            baseUrl = 'http://localhost:10000';
        }
    }

    // Global o'zgaruvchi sifatida o'rnatish
    window.API_BASE_URL = baseUrl;
    console.log("RentCar API manzili:", baseUrl || "(Ayni manzil - Express server)");
})();
