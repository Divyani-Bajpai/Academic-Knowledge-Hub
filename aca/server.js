const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all static files (HTML, CSS, JS, images) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Optional: explicit routes for each HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});
app.get('/community', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'community.html'));
});
app.get('/dashboard_student', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard_student.html'));
});
app.get('/dashboard_faculty', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard_faculty.html'));
});
app.get('/doubt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'doubt.html'));
});
app.get('/faculty', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'faculty.html'));
});
app.get('/hub', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hub.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});
app.get('/syllabus', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'syllabus.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
