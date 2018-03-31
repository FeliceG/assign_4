var mongoose = require('mongoose');
var Student = require('../models/studentModel');

//Create the controller
var studentController = {};

//Render the student registration form and display any students
//in the database.
studentController.list = function(req, res) {
  Student.find({})
    .then((students)=>{
      res.render('students', {
        "students": students
    });
  })
  .catch((err)=> {
    console.log(err);
  });
}

//Add the student to the database and display on the home page
studentController.create = function(req, res) {
  var student = new Student({
    first: req.body.first,
    last: req.body.last,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state
  });
  student.save()
  .then((s)=>{
    res.redirect('/');
  })
  .catch((err)=> {
    console.log(err);
  });
}

//Render the Edit/Delete page with the information for
//the student specified by the id number
studentController.read = function(req, res) {
Student.findOne({ _id: req.params.studentid})
  .then((student) => {
     res.render('edit_student', {
      student: student });
  })
  .catch((err)=> {
    console.log(err);
  });
}

//Update the information entered for the specified by the
//student id

studentController.update = function(req, res) {
  Student.findByIdAndUpdate(
    req.params.studentid,
    {
      $set: {
        first: req.body.first,
        last: req.body.last,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state
      }
    }
  )
  .then((student) => {
    res.redirect('/');
  })
  .catch((err)=> {
    console.log(err);
  });
}

//Delete the student specified by the student id
studentController.delete = function(req, res) {
  Student.findByIdAndRemove(req.params.studentid)
  .then((student) => {
    res.redirect('/');
  })
  .catch((err)=> {
    console.log(err);
  });
}

module.exports = studentController;
