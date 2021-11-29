const mongoose = require('mongoose');
const express = require('express');
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const Student = require('./models/student');
const app = express();

const mongoUrl = 'mongodb+srv://vijayTech:vijayTech@cluster0.too1c.mongodb.net/student';
mongoose.connect(mongoUrl, {useNewUrlParser:true,useUnifiedTopology: true })
  .then(()=>{
      console.log("connection successful!");
  })
  .catch(()=>console.log("connection failed!"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("server/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "server/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

app.post("/api/student",
multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  Student.find({rollNumber: req.body.rollNumber}).then(response => {
    if(response.length === 0){
      const student = new Student({
        rollNumber: req.body.rollNumber,
        name: req.body.name,
        imagePath: url + "/images/" + req.file.filename
      });
      student.save();
      res.status(201).json({
        status: "success",
        statusCode: "V00",
        message: "Student added successfully!"
      });
    }else{
      res.status(201).json({
        status: "success",
        statusCode: "V01",
        message: "Duplicate roll number!"
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      status: "fail",
      message: "Fetching students failed!"
    });
  });

});

app.get("/api/student", (req, res, next) => {
  Student.find().then(response => {
    res.status(200).json({
      status: "success",
      statusCode: "V00",
      message: "Students fetched successfully!",
      students: response
    });
  })
  .catch(error => {
    res.status(500).json({
      status: "fail",
      message: "Fetching students failed!"
    });
  });
});

app.get("/api/student/:rollNumber", (req, res, next) => {
  Student.findOne({rollNumber: req.params.rollNumber})
  .then(response => {
    if (response) {
      res.status(200).json({
        status: "success",
        statusCode: "V00",
        student: response,
        message:"Student found successfully!"
      });
    } else {
      res.status(404).json({
        status: "success",
        statusCode: "V00",
        student: response,
        message: "Student not found!"
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      status: "fail",
      message: "Fetching student failed!"
    });
  });
});

app.put("/api/student", multer({ storage: storage }).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const student = new Student({
    _id: req.body.id,
    rollNumber: req.body.rollNumber,
    name: req.body.name,
    imagePath: imagePath
  });
  Student.findOne({rollNumber: req.body.rollNumber})
  .then(response => {
    if (response && response?._id != req.body.id) {
      res.status(200).json({
        status: "success",
        statusCode: "V01",
        student: response,
        message:"Duplicate roll number!"
      });
    }else{
      Student.updateOne({_id: req.body.id}, student)
      .then(response => {
        if (response.n > 0) {
          res.status(200).json({
            status: "success",
            statusCode: "V00",
            student: response,
            message:"Student updated successfully!"});
        } else {
          res.status(401).json({
            status: "success",
            statusCode: "V02",
            student: response,
            message: "Not authorized!"
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          status: 'fail',
          message: "Couldn't update student!"
        });
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      status: "fail",
      message: "Couldn't update student!"
    });
  });
});

app.delete("/api/student/:id", (req, res, next) => {
  Student.findOneAndDelete({_id: req.params.id}, null)
  .then(response => {
    if (response) {
      Student.find().then(result => {
        res.status(200).json({
          status: "success",
          statusCode: "V00",
          students: result,
          message: "Student deleted successfully!",
        });
      })
      .catch(error => {
        res.status(500).json({
          status: "success",
          statusCode: "V00",
          students: response,
          message: "Student not fetched successfully!"
        });
      });
    } else {
      res.status(404).json({
        status: "success",
        statusCode: "V03",
        message: "Student not found!"
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      status: "fail",
      message: "Student not found!"
    });
  });
});

module.exports = app;
