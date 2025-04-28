//server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const dbConnection = require('./config/dbConnection');
const Admin = require('./models/adminModel');
const Student = require('./models/studentModel');
const Course = require('./models/courseModel');

const app = express();
dbConnection();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data from requests
app.use(express.json());

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Get all admins
app.get('/admins', async (req, res) => {
    try {
      const admins = await Admin.find();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve admins', error: error.message });
    }
  });

// Handle admin creation
app.post('/admins', async (req, res) => {
  try {
    const { adminId, username, password, role } = req.body;
    const newAdmin = new Admin({ adminId, username, password, role });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Add a new student
app.post('/students', async (req, res) => {
    try {
      const newStudent = await Student.create(req.body);
      res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add student', error: error.message });
    }
  });
  
  // Get all students
  app.get('/students', async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve students', error: error.message });
    }
  });

  // Add a new course
app.post('/courses', async (req, res) => {
    try {
      const newCourse = await Course.create(req.body);
      res.status(201).json({ message: 'Course added successfully', course: newCourse });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add course', error: error.message });
    }
  });
  
  // Get all courses
  app.get('/courses', async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve courses', error: error.message });
    }
  });



app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
