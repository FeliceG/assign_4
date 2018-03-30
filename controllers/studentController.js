var mongoose = require('mongoose');
var Student = require('../models/studentModel');

//Create the controller
var studentController = {};

studentController.list = function(req, res) {
  console.log("Listing students");
  Student.find({})
    .then((students)=>{
      console.log("Students: " + students);
      res.render('students', {
        "students": students
    });
  })
  .catch((err)=> {
    console.log(err);
  });
}

studentController.create = function(req, res) {
  console.log("create");
  var student = new Student({
    first: req.body.first,
    last: req.body.last,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state
  });
  console.log("just before save students");
  console.log(student);
  student.save()
  .then((s)=>{
    console.log("Saving: " + s);
    res.redirect('/students');
  })
  .catch((err)=> {
    console.log(err);
  });
}

studentController.read = function(req, res) {
  console.log("Reading for id: " + req.params.studentid);
  Student.findOne({_id: req.params.studentid})
  .then((student) => {
     res.render('edit_student', {
      student: student });
  })
  .catch((err)=> {
    console.log(err);
  });
}

studentController.update = function(req, res) {
  console.log("Listing students");
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
    res.redirect('/students');
  })
  .catch((err)=> {
    console.log(err);
  });
}

studentController.delete = function(req, res) {
  console.log("Listing students");
  Student.findByIdAndRemove(req.params.studentid)
  .then((student) => {
    res.redirect('/students');
  })
  .catch((err)=> {
    console.log(err);
  });
}

module.exports = studentController;
