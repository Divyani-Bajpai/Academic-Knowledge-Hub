const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Helper to call C executables
function runExe(fileName, args = [], res) {
    const exePath = path.join(__dirname, fileName);
    execFile(exePath, args, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            res.status(500).send(stderr || 'Error running API');
            return;
        }
        res.send(stdout);
    });
}

// ===== API ROUTES =====

// Auth API
app.post('/api/auth', (req, res) => {
    const { username, password } = req.body;
    runExe('auth_api.exe', [username, password], res);
});

// Community API
app.post('/api/community', (req, res) => {
    const { userId, message } = req.body;
    runExe('community_api.exe', [userId, message], res);
});

// Doubt API
app.post('/api/doubt', (req, res) => {
    const { userId, doubtText } = req.body;
    runExe('doubt_api.exe', [userId, doubtText], res);
});

// Notes API
app.post('/api/notes', (req, res) => {
    const { noteId, content } = req.body;
    runExe('notes_api.exe', [noteId, content], res);
});

// Quiz API
app.post('/api/quiz', (req, res) => {
    const { quizId, answer } = req.body;
    runExe('quiz_api.exe', [quizId, answer], res);
});

// Syllabus API
app.post('/api/syllabus', (req, res) => {
    const { syllabusId, content } = req.body;
    runExe('syllabus_api.exe', [syllabusId, content], res);
});

// Faculty API
app.post('/api/faculty', (req, res) => {
    const { facultyId, data } = req.body;
    runExe('faculty_api.exe', [facultyId, data], res);
});

// Default route: serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
