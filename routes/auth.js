// Authentication routes: register + login

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { User } = req.models;
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = await User.create({
      email,
      password,
      role: role || 'user'
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role
    });

  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { User } = req.models;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isValid = await user.checkPassword(password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    res.json({ token });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
