
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/register', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: 'Student registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering student' });
    }
});

router.get('/search', async (req, res) => {
    try {
        const students = await Student.find(req.query);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching students' });
    }
});

module.exports = router;
