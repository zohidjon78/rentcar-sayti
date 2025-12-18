const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- 2. MONGODB BAZASIGA ULANISH ---
const dbURI = 'mongodb+srv://rentcarr:zohid571@cluster0.bqauelt.mongodb.net/rentcar_db?retryWrites=true&w=majority';

// Yangi versiyada qavs ichidagi ortiqcha sozlamalar (useNewUrlParser va h.k) olib tashlandi
mongoose.connect(dbURI)
    .then(() => console.log("Bulutli baza (MongoDB Atlas) bilan aloqa o'rnatildi! ✅"))
    .catch(err => {
        console.error("❌ BAZADA XATO:");
        console.error(err.message);
    });

// --- 3. MODELLAR ---
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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Bu email bilan ro'yxatdan o'tilgan!" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅" });
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik yuz berdi." });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login so'rovi: ${email} 🔑`);
        const user = await User.findOne({ email });
        
        if (!user || user.password !== password) {
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

// --- 5. SERVERNI YOQISH ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server ishlamoqda: Port ${PORT} 🚀`);
});