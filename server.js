const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// POST route to handle form data
app.post('/submit-message', (req, res) => {
  const { name, email, message } = req.body;
  const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n-----\n`;

  fs.appendFile('message.txt', data, (err) => {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    res.json({ success: true, message: 'Message saved successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
