const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

require('dotenv').config();


// Welcome
const welcome = (req, res) => {
  res.json({ message: 'Selamat datang di To Do List MEVN Silakan Login terlebih dahulu' });
};

// Register user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Cek apakah email sudah terdaftar
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email sudah terdaftar' });

        // Simpan pengguna baru
        user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: 'User berhasil didaftarkan' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Email tidak ditemukan' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Password salah' });

        // Buat token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        console.log("Login Berhasil");
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { welcome, register, login};