require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

const JWT_SECRET = process.env.JWT_SECRET || 'rentcar_super_secret_jwt_key_2025_secure';

// --- 1. MIDDLEWARE ---
const allowedOrigins = [
    'https://avtorental.uz',
    'https://www.avtorental.uz',
    'https://rentcar-sayti.vercel.app',
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:5173',
    'http://127.0.0.1:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // So'rov manzilini tekshirish (brauzersiz so'rovlar, localhost va Vercel'ga to'liq ruxsat)
        if (!origin) return callback(null, true);
        if (
            allowedOrigins.includes(origin) || 
            origin.endsWith('.vercel.app') || 
            origin.startsWith('http://localhost') || 
            origin.startsWith('http://127.0.0.1')
        ) {
            return callback(null, true);
        }
        return callback(null, true); // Dev va testlar uchun ruxsat
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
})); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- 2. MODELLAR (SCHEMAS) ---
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    lastSeen: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const Message = mongoose.model('Message', new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now }
}));

const Order = mongoose.model('Order', new mongoose.Schema({
    userName: { type: String, required: true, trim: true },
    carName: { type: String, required: true, trim: true },
    paymentMethod: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now }
}));

// --- YORDAMCHI MIDDLEWARE (AUTH) ---
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        req.user = null;
        return next();
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (!err) {
            req.user = user;
        }
        next();
    });
}

// --- 3. ASOSIY YO'LLAR (ROUTES) ---

app.get('/', (req, res) => {
    res.json({ 
        status: "success", 
        message: "RentCar serveri muvaffaqiyatli ishlayapti! 🚀",
        time: new Date()
    });
});

app.get('/ping', (req, res) => {
    res.json({ pong: true, time: new Date() });
});

// RO'YXATDAN O'TISH
app.post('/register', async (req, res) => {
    try {
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Barcha maydonlarni to'ldiring!" });
        }

        name = name.trim();
        email = email.trim().toLowerCase();

        // Validatsiya
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Email formati noto'g'ri!" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Bu email bilan ro'yxatdan o'tilgan!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            lastSeen: new Date() 
        });
        await newUser.save();
        
        return res.status(201).json({ message: "Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅" });
    } catch (error) {
        console.error("Register xatosi:", error);
        return res.status(500).json({ error: "Serverda xatolik yuz berdi: " + error.message });
    }
});

// LOGIN
app.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: "Email va parolni kiriting!" });
        }

        email = email.trim().toLowerCase();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Email yoki parol noto'g'ri!" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Email yoki parol noto'g'ri!" });
        }

        user.lastSeen = new Date();
        await user.save();

        // JWT Token yaratish
        const token = jwt.sign(
            { userId: user._id, name: user.name, email: user.email, role: user.role || 'user' },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({ 
            message: "Xush kelibsiz!", 
            userName: user.name, 
            userEmail: user.email,
            token: token
        });
    } catch (error) {
        console.error("Login xatosi:", error);
        return res.status(500).json({ error: "Serverda xatolik: " + error.message });
    }
});

// BUYURTMALAR VA XABARLAR (POST)
app.post('/api/orders', async (req, res) => {
    try {
        const { userName, carName, paymentMethod } = req.body;
        if (!userName || !carName) {
            return res.status(400).json({ error: "Mijoz ismi va mashina tanlanishi shart!" });
        }

        const newOrder = new Order({ 
            userName: userName.trim(), 
            carName: carName.trim(), 
            paymentMethod: paymentMethod || "Sayt orqali (Premium)" 
        });
        await newOrder.save();
        res.status(201).json({ message: "Buyurtma bazaga saqlandi! ✅", order: newOrder });
    } catch (error) {
        console.error("Order saqlash xatosi:", error);
        res.status(500).json({ error: "Buyurtmani saqlab bo'lmadi." });
    }
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Barcha maydonlarni to'ldiring!" });
        }

        const newMessage = new Message({ 
            name: name.trim(), 
            email: email.trim(), 
            message: message.trim() 
        });
        await newMessage.save();
        res.status(201).json({ message: "Xabaringiz muvaffaqiyatli yuborildi! ✅" });
    } catch (error) {
        console.error("Xabar saqlash xatosi:", error);
        res.status(500).json({ error: "Xabarni saqlab bo'lmadi." });
    }
});

// FOYDALANUVCHI MA'LUMOTLARI
app.get('/api/user/:email', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { email: req.params.email.toLowerCase().trim() }, 
            { lastSeen: new Date() },
            { new: true, projection: { password: 0 } }
        );
        if (!user) return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
        res.json(user);
    } catch (error) {
        console.error("User olish xatosi:", error);
        res.status(500).json({ error: "Serverda xatolik" });
    }
});

app.get('/api/orders/:userName', async (req, res) => {
    try {
        const orders = await Order.find({ userName: req.params.userName }).sort({ date: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Orders olish xatosi:", error);
        res.status(500).json({ error: "Ma'lumotlarni yuklab bo'lmadi." });
    }
});

// STATISTIKA VA RO'YXATLAR
app.get('/api/stats', async (req, res) => {
    try {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        const [totalUsers, totalOrders, totalMessages, activeNow] = await Promise.all([
            User.countDocuments(),
            Order.countDocuments(),
            Message.countDocuments(),
            User.countDocuments({ lastSeen: { $gte: fiveMinutesAgo } })
        ]);

        res.json({
            users: totalUsers,
            orders: totalOrders,
            messages: totalMessages,
            active: activeNow,
            cars: 125 
        });
    } catch (error) {
        console.error("Stats olish xatosi:", error);
        res.status(500).json({ error: "Statistikani yuklab bo'lmadi." });
    }
});

app.get('/api/online-users', async (req, res) => {
    try {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const users = await User.find({ lastSeen: { $gte: fiveMinutesAgo } }, { name: 1, email: 1 });
        res.json(users);
    } catch (err) { 
        console.error("Online users olish xatosi:", err);
        res.status(500).json({ error: "Onlayn mijozlarni olib bo'lmadi" }); 
    }
});

app.get('/api/all-users', async (req, res) => {
    try {
        const users = await User.find({}, { name: 1, email: 1 }).sort({ lastSeen: -1 });
        res.json(users);
    } catch (err) { 
        console.error("All users olish xatosi:", err);
        res.status(500).json({ error: "Mijozlarni olib bo'lmadi" }); 
    }
});

app.get('/api/all-orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) { 
        console.error("All orders olish xatosi:", err);
        res.status(500).json({ error: "Buyurtmalarni olib bo'lmadi" }); 
    }
});

app.get('/api/all-messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) { 
        console.error("All messages olish xatosi:", err);
        res.status(500).json({ error: "Xabarlarni olib bo'lmadi" }); 
    }
});

// --- 4. BAZAGA ULANIB, KEYIN SERVERNI YOQISH ---
const PORT = process.env.PORT || 10000;
const rawURI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb+srv://idasturiy_db_user:zohidjon_6666@cluster0.sfpoqxq.mongodb.net/rentcar_db?retryWrites=true&w=majority';
// Nuqtali vergul va bo'sh joylarni tozalash
const dbURI = rawURI.trim().replace(/;$/, '');

mongoose.connect(dbURI)
    .then(() => {
        console.log("Bulutli baza (MongoDB Atlas) bilan aloqa o'rnatildi! ✅");
        app.listen(PORT, () => {
            console.log(`Server ishlamoqda: Port ${PORT} 🚀`);
        });
    })
    .catch(err => {
        console.error("❌ BAZADA XATO:");
        console.error(err.message);
    });