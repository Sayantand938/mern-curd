const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Define a simple Mongoose schema and model
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String, // Using String for simplicity, could use Date
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
});

const Student = mongoose.model('Student', studentSchema);

// CRUD Routes

// Create a new student
app.post('/students', async (req, res) => {
  console.log('Received student data:', req.body); // Add this line for logging
  try {
    const student = new Student({
      name: req.body.name,
      dob: req.body.dob,
      phoneno: req.body.phoneno,
      email: req.body.email,
      subject: req.body.subject,
      cgpa: req.body.cgpa,
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error('Error saving student:', err); // Log the full error object
    res.status(400).json({ message: err.message });
  }
});

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a student
app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.name = req.body.name;
    student.dob = req.body.dob;
    student.phoneno = req.body.phoneno;
    student.email = req.body.email;
    student.subject = req.body.subject;
    student.cgpa = req.body.cgpa;
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await student.deleteOne();
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
