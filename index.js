const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Koneksi MongoDB
mongoose.connect('mongodb+srv://ctflabs:R130109D@ctfl.y5b9cl1.mongodb.net/?retryWrites=true&w=majority&appName=CTFL', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// Model eBook
const eBookSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    price: Number,
    ownerId: Number
});

const eBookModel = mongoose.model('eBook', eBookSchema);

// Secret key untuk JWT (dalam real-world harus disimpan di env)
const JWT_SECRET = 'Dw/G:+@%VR[a$LV,D4L{5+(4I}+zf+ER';

// Middleware auth JWT
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Token required');
    
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        res.status(403).send('Invalid token');
    }
};

// Endpoint login (user biasa)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Auth sederhana
    if (username === 'user' && password === 'password123') {
        const token = jwt.sign(
            { userId: 1001, role: 'user' }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );
        return res.json({ token });
    }
    
    res.status(401).send('Login failed');
});

// Endpoint get eBook (rentan IDOR)
app.get('/api/ebooks/:id', authMiddleware, async (req, res) => {
    try {
        const ebook = await eBookModel.findOne({ id: req.params.id });
        if (!ebook) return res.status(404).send('eBook not found');
        
        // Vulnerable: Tidak memeriksa ownership!
        res.json({
            title: ebook.title,
            content: ebook.content,
            price: ebook.price
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Seed database
async function seedDB() {
    await eBookModel.deleteMany({});
    
    await eBookModel.create([
        { 
            id: 100, 
            title: 'eBook Gratis', 
            content: 'Ini adalah contoh eBook gratis', 
            price: 0,
            ownerId: 1001
        },
        { 
            id: 1337, 
            title: 'eBook Premium', 
            content: 'CTF_FLAG{JWT_IDOR_Pr3v3nt1on_1s_Key}', 
            price: 50000,
            ownerId: 9999  // Admin
        }
    ]);
    
    console.log('Database seeded!');
}

// Start server
app.listen(4000, async () => {
    console.log('Server running on http://localhost:4000');
    await seedDB();
});