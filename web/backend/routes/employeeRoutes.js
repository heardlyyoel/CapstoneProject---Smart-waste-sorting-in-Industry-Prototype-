const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

// ✅ Get All Employees
router.get('/', async (req, res) => {
  const employees = await User.find({ role: 'employee' });
  res.json(employees);
});

// ➕ Add New Employee
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashed, role: 'employee' });
  await newUser.save();
  res.json({ message: 'Employee added' });
});

// ✏️ Update Employee
router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email });
  res.json({ message: 'Employee updated' });
});

// ❌ Delete Employee
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
});

// 🔐 Login Employee
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, role: 'employee' });
  if (!user) return res.status(404).json({ message: 'Employee not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});


module.exports = router;
