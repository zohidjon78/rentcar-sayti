// RentCar Tizimini To'liq Testlash Skripti
async function runTests() {
    const BASE_URL = 'http://localhost:10000';
    console.log("=== RENTCAR TEST BOSHLANDI ===");

    const testEmail = `user_${Date.now()}@example.com`;
    const testName = `Mijoz_${Math.floor(Math.random() * 1000)}`;
    const testPassword = 'securePass123';

    // 1. RO'YXATDAN O'TISH TESTI
    console.log(`\n1. Ro'yxatdan o'tish tekshirilmoqda (${testEmail})...`);
    const regRes = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: testName, email: testEmail, password: testPassword })
    });
    const regData = await regRes.json();
    console.log(`Status: ${regRes.status}`, regData);
    if (!regRes.ok) throw new Error("Ro'yxatdan o'tishda xato!");

    // 2. LOGIN TESTI
    console.log(`\n2. Tizimga kirish (Login) tekshirilmoqda...`);
    const loginRes = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, password: testPassword })
    });
    const loginData = await loginRes.json();
    console.log(`Status: ${loginRes.status}`, loginData);
    if (!loginRes.ok || !loginData.token) throw new Error("Loginda xato!");

    // 3. BUYURTMA BERISH TESTI
    console.log(`\n3. Mashina bron qilish (/api/orders) tekshirilmoqda...`);
    const orderRes = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({
            userName: testName,
            carName: "Chevrolet Malibu 2",
            paymentMethod: "Payme / Karta"
        })
    });
    const orderData = await orderRes.json();
    console.log(`Status: ${orderRes.status}`, orderData);
    if (!orderRes.ok) throw new Error("Buyurtma berishda xato!");

    // 4. BUYURTMALAR RO'YXATINI OLISH (PROFIL UCHUN)
    console.log(`\n4. Mijoz buyurtmalarini olish (/api/orders/${testName}) tekshirilmoqda...`);
    const myOrdersRes = await fetch(`${BASE_URL}/api/orders/${encodeURIComponent(testName)}`);
    const myOrdersData = await myOrdersRes.json();
    console.log(`Status: ${myOrdersRes.status}`, `Topilgan buyurtmalar soni: ${myOrdersData.length}`);
    if (!myOrdersRes.ok || myOrdersData.length === 0) throw new Error("Buyurtmalarni olishda xato!");

    // 5. ALOQA XABARI YUBORISH TESTI
    console.log(`\n5. Aloqa xabari yuborish (/contact) tekshirilmoqda...`);
    const msgRes = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: testName,
            email: testEmail,
            message: "Assalomu alaykum, tizim juda zo'r ishlamoqda!"
        })
    });
    const msgData = await msgRes.json();
    console.log(`Status: ${msgRes.status}`, msgData);
    if (!msgRes.ok) throw new Error("Aloqa xabarida xato!");

    // 6. STATISTIKA TESTI
    console.log(`\n6. Platforma statistikasini tekshirish (/api/stats)...`);
    const statsRes = await fetch(`${BASE_URL}/api/stats`);
    const statsData = await statsRes.json();
    console.log(`Status: ${statsRes.status}`, statsData);
    if (!statsRes.ok || statsData.orders < 1) throw new Error("Statistikada xato!");

    console.log("\n=================================");
    console.log("BARCHA TESTLAR 100% MUVAFFAQITYATLI O'TDI! ✅🎉");
    console.log("=================================");
}

runTests().catch(err => {
    console.error("Test muvaffaqiyatsiz tugadi ❌:", err);
    process.exit(1);
});
