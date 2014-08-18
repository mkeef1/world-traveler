'use strict';

exports.index = function(req, res){
  res.render('vacations/index');
};


exports.create = function(req, res){
  console.log(req.body);
};
