const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- 1. MIDDLEWARE ---
// CORS ni barcha so'rovlar uchun ochiq qilib qo'yamiz
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- 2. MONGODB BAZASIGA ULANISH ---
// DB_URI dagi appName va boshqa parametrlarni tozalab, eng barqaror ko'rinishga keltirdim
const dbURI = 'mongodb+srv://rentcarr:zohid_571@cluster0.bqauelt.mongodb.net/rentcar_db?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Bulutli baza (MongoDB Atlas) bilan aloqa o'rnatildi! ✅"))
    .catch(err => console.error("Bazada xato yuz berdi:", err));

// --- 3. MODELLAR ---
// User modelida emailni unique qilish uchun index: true qo'shildi
const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true }
}));

const Message = mongoose.model('Message', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
}));

const Order = mongoose.model('Order', new mongoose.Schema({
    userName: { type: String, required: true },
    carName: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    date: { type: Date, default: Date.now }
}));

// --- 4. YO'LLAR (ROUTES) ---

app.get('/', (req, res) => {
    console.log("Asosiy sahifaga so'rov keldi 🌐");
    res.send("Server muvaffaqiyatli ishlayapti! 🚀");
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Oldin tekshiramiz, foydalanuvchi bormi?
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Bu email bilan ro'yxatdan o'tilgan!" });
        }

        console.log(`Yangi ro'yxatdan o'tish: ${name} (${email}) 👤`);
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅" });
    } catch (error) {
        console.log("Ro'yxatdan o'tishda xato:", error.message);
        res.status(500).json({ error: "Serverda xatolik yuz berdi." });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login so'rovi: ${email} 🔑`);
        const user = await User.findOne({ email });
        
        if (!user || user.password !== password) {
            console.log("Login muvaffaqiyatsiz: Xato email yoki parol");
            return res.status(401).json({ error: "Email yoki parol noto'g'ri!" });
        }
        
        console.log(`Foydalanuvchi tizimga kirdi: ${user.name} ✅`);
        res.status(200).json({ 
            message: "Xush kelibsiz!", 
            userName: user.name, 
            userEmail: user.email 
        });
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik." });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { userName, carName, paymentMethod } = req.body;
        console.log(`Yangi buyurtma! Kimdan: ${userName}, Mashina: ${carName} 🚗`);
        const newOrder = new Order({ userName, carName, paymentMethod });
        await newOrder.save();
        res.status(201).json({ message: "Buyurtma bazaga saqlandi! ✅" });
    } catch (error) {
        console.log("Buyurtma saqlashda xato:", error.message);
        res.status(500).json({ error: "Buyurtmani saqlab bo'lmadi." });
    }
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log(`Yangi xabar keldi! Kimdan: ${name} ✉️`);
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: "Xabaringiz muvaffaqiyatli yuborildi! ✅" });
    } catch (error) {
        res.status(500).json({ error: "Xabarni saqlab bo'lmadi." });
    }
});

app.get('/api/user/:email', async (req, res) => {
    console.log(`Foydalanuvchi ma'lumoti so'raldi: ${req.params.email}`);
    try {
        const user = await User.findOne({ email: req.params.email }, { password: 0 });
        if (!user) return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik" });
    }
});

app.get('/api/orders/:userName', async (req, res) => {
    console.log(`${req.params.userName}ning buyurtmalari ko'rilmoqda 📋`);
    try {
        const orders = await Order.find({ userName: req.params.userName }).sort({ date: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Ma'lumotlarni yuklab bo'lmadi." });
    }
});

// --- 5. SERVERNI YOQISH ---
// Render uchun PORT 10000 bo'lishi maqsadga muvofiq
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server ishlamoqda: Port ${PORT} 🚀`);
});