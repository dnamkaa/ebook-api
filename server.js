const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.array('files'), (req, res) => {
  res.status(200).json({ message: 'Files uploaded successfully' });
});

app.get('/ebooks', (req, res) => {
  fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading directory' });
    }

    const ebooks = files.map((file, index) => ({
      id: index + 1,
      cover_url: `http://localhost:5000/uploads/${file}`, // Updated URL to include hostname
      title: file,
      isAvailable: true,
    }));

    res.json(ebooks);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
