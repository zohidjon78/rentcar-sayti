require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// --- 1. MIDDLEWARE ---
// CORS: avtorental.uz domeningizga ruxsat berildi
app.use(cors({
    origin: ['https://avtorental.uz', 'https://www.avtorental.uz'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- 2. MONGODB BAZASIGA ULANISH ---
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://rentcarr:zohid2107@cluster0.bqauelt.mongodb.net/rentcar_db?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => console.log("Bulutli baza (MongoDB Atlas) bilan aloqa o'rnatildi! ✅"))
    .catch(err => {
        console.error("❌ BAZADA XATO:");
        console.error(err.message);
    });

// --- 3. MODELLAR (SCHEMAS) ---
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

// --- 4. ASOSIY YO'LLAR (ROUTES) ---

app.get('/', (req, res) => {
    res.send("Server muvaffaqiyatli ishlayapti! 🚀");
});

// RO'YXATDAN O'TISH
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Bu email bilan ro'yxatdan o'tilgan!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅" });
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik yuz berdi." });
    }
});

// LOGIN
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: "Email yoki parol noto'g'ri!" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ error: "Email yoki parol noto'g'ri!" });
        }

        res.status(200).json({ 
            message: "Xush kelibsiz!", 
            userName: user.name, 
            userEmail: user.email 
        });
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik." });
    }
});

// BUYURTMALAR VA XABARLAR (POST)
app.post('/api/orders', async (req, res) => {
    try {
        const { userName, carName, paymentMethod } = req.body;
        const newOrder = new Order({ userName, carName, paymentMethod });
        await newOrder.save();
        res.status(201).json({ message: "Buyurtma bazaga saqlandi! ✅" });
    } catch (error) {
        res.status(500).json({ error: "Buyurtmani saqlab bo'lmadi." });
    }
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: "Xabaringiz muvaffaqiyatli yuborildi! ✅" });
    } catch (error) {
        res.status(500).json({ error: "Xabarni saqlab bo'lmadi." });
    }
});

// FOYDALANUVCHI MA'LUMOTLARI
app.get('/api/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }, { password: 0 });
        if (!user) return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik" });
    }
});

app.get('/api/orders/:userName', async (req, res) => {
    try {
        const orders = await Order.find({ userName: req.params.userName }).sort({ date: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Ma'lumotlarni yuklab bo'lmadi." });
    }
});

// --- 5. STATISTIKA VA RO'YXATLAR ---

app.get('/api/stats', async (req, res) => {
    try {
        const [totalUsers, totalOrders, totalMessages] = await Promise.all([
            User.countDocuments(),
            Order.countDocuments(),
            Message.countDocuments()
        ]);
        const activeNow = Math.floor(Math.random() * (35 - 8 + 1)) + 8;

        res.json({
            users: totalUsers,
            orders: totalOrders,
            messages: totalMessages,
            active: activeNow,
            cars: 125
        });
    } catch (error) {
        res.status(500).json({ error: "Statistikani yuklab bo'lmadi." });
    }
});

app.get('/api/all-users', async (req, res) => {
    try {
        const users = await User.find({}, { name: 1, email: 1 });
        res.json(users);
    } catch (err) { res.status(500).json({ error: "Mijozlarni olib bo'lmadi" }); }
});

app.get('/api/all-orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) { res.status(500).json({ error: "Buyurtmalarni olib bo'lmadi" }); }
});

app.get('/api/all-messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) { res.status(500).json({ error: "Xabarlarni olib bo'lmadi" }); }
});

// --- 6. SERVERNI YOQISH ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server ishlamoqda: Port ${PORT} 🚀`);
});