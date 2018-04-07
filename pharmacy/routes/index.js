var MedicineApi = require('../data/MedicinesApi');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  MedicineApi.getAllMedicines(function(err, items){
    res.render('medicines', {title: 'Pharmacy app', medicines: items, "idArray":[]})
  });
  //res.render('medicines', { title: 'Express' });
  
});

router.get('/addmedicine', function(req, res) {
  res.render('addmedicine', {"types": ["Capsule", "Tablet", "Syrup", "Gel"]});
});

router.post('/addmedicine', function(req, res) {
  var medicine = {};
  medicine.name = req.body.name;
  medicine.manufacturer = req.body.manufacturer;
  medicine.batchNo = req.body.batchNo;
  medicine.expirationDate = req.body.expirationDate;
  medicine.price = req.body.price;
  medicine.type = req.body.type;

  MedicineApi.saveMedicine(medicine, function(err, comment) {
	  res.redirect('/');
  });
});

router.get('/editmedicine/:id', function(req, res) {
  MedicineApi.getMedicineById(req.params.id, function(err, medicine) {
    res.render('editmedicine', {medicine: medicine, "types": ["Capsule", "Tablet", "Syrup", "Gel"]});
  });
});

router.post('/editmedicine/:id', function(req, res) {
  var updatedMedicine = {};
  updatedMedicine.name = req.body.name;
  updatedMedicine.manufacturer = req.body.manufacturer;
  updatedMedicine.batchNo = req.body.batchNo;
  updatedMedicine.expirationDate = req.body.expirationDate;
  updatedMedicine.price = req.body.price;
  updatedMedicine.type = req.body.type;
  MedicineApi.updateMedicineById(req.params.id, updatedMedicine, function(err) {
    res.redirect('/');
  });
});


router.get('/deletemedicine/:id', function(req, res) {
  MedicineApi.deleteMedicineById(req.params.id, function(err) {
    res.redirect('/');
  });
});

router.post('/deletemultiplemedicines', function(req, res) {
  MedicineApi.deleteMultipleMedicines(req.body.chk, function(err) {
    res.redirect('/');
  });
});

/*
router.post('/deletemultiplemedicines', function(req, res) {
    var medicinesId = {};
    MedicineApi.deleteMultipleMedicines(req.body.chk, function(err) {
      res.send(req.body);
    });
  }); */

module.exports = router;
