
const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');

router.post('/register', async (req, res) => {
    try {
        const tutor = new Tutor(req.body);
        await tutor.save();
        res.status(201).json({ message: 'Tutor registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering tutor' });
    }
});

router.get('/search', async (req, res) => {
    try {
        console.log("Received tutor search request with filters:", req.query);

        const tutors = await Tutor.find(req.query);

        console.log("Tutors found:", tutors.length);
        res.json(tutors);
    } catch (error) {
        console.error("Error fetching tutors:", error);
        res.status(500).json({ error: 'Error fetching tutors' });
    }
});

module.exports = router;
