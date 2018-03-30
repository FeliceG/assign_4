var express = require('express');
var students = require('../controllers/studentController');
var router = express.Router();

// Read a list of quotes
router.get('/', students.list);

// Create a single quote
router.post('/create', students.create);

// Read a single quote in an edit form
router.get('/:studentid', students.read);

// Update a single quote
router.post('/update/:studentid', students.update);

// Delete a single quote
router.get('/delete/:studentid', students.delete);

module.exports = router;
