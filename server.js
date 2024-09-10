const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
