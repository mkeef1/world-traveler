'use strict';

var Vacation = require('../models/vacation'),
    moment = require('moment');

exports.init = function(req, res){
  res.render('vacations/init');
};

exports.create = function(req, res){
  Vacation.save(req.body, function(){
    res.redirect('/vacations');
  });
};

exports.index = function(req, res){
  Vacation.all(function(err, vacations){
    res.render('vacations/index', {vacations:vacations, moment:moment});
  });
};

exports.show = function(req, res){
  Vacation.findById(req.params.id, function(err, vacation){
    res.render('vacations/show', {vacation:vacation, moment:moment});
  });
};

exports.addPhoto = function(req, res){
  Vacation.findById(req.params.id, function(err, vacation){
    vacation.addPhoto(req.body.url, function(){
      res.redirect('/vacations/' + req.params.id);
    });
  });
};
