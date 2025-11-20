const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Serve all files inside 'public' folder
app.use(express.static('public'));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utility to get full path to data files
function dataFile(fileName) {
    return path.join(__dirname, fileName);
}

// Routes for HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/auth', (req, res) => res.sendFile(path.join(__dirname, 'public', 'auth.html')));
app.get('/community', (req, res) => res.sendFile(path.join(__dirname, 'public', 'community.html')));
app.get('/dashboard_faculty', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard_faculty.html')));
app.get('/dashboard_student', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard_student.html')));
app.get('/doubt', (req, res) => res.sendFile(path.join(__dirname, 'public', 'doubt.html')));
app.get('/faculty', (req, res) => res.sendFile(path.join(__dirname, 'public', 'faculty.html')));
app.get('/hub', (req, res) => res.sendFile(path.join(__dirname, 'public', 'hub.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')));
app.get('/quiz', (req, res) => res.sendFile(path.join(__dirname, 'public', 'quiz.html')));
app.get('/syllabus', (req, res) => res.sendFile(path.join(__dirname, 'public', 'syllabus.html')));

// API routes to run .exe files (example for auth_api)
app.post('/api/auth', (req, res) => {
    exec(path.join(__dirname, 'auth_api.exe'), (err, stdout, stderr) => {
        if (err) return res.status(500).send(stderr);
        res.send(stdout);
    });
});

// You can duplicate above for other .exe files:
app.post('/api/faculty', (req, res) => {
    exec(path.join(__dirname, 'faculty_api.exe'), (err, stdout, stderr) => {
        if (err) return res.status(500).send(stderr);
        res.send(stdout);
    });
});

// Add more .exe API endpoints as needed...

// Example API to read a text file
app.get('/api/accounts', (req, res) => {
    const filePath = dataFile('accounts.txt');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        res.send(data);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
