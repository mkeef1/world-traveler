'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash'),
    cp    = require('child_process');

function Vacation(o){
  this.name = o.name;
  this.lat = parseFloat(o.lat);
  this.lng = parseFloat(o.lng);
  this.start = new Date(o.start);
  this.end = new Date(o.end);
  this.photos = [];
}

Object.defineProperty(Vacation, 'collection', {
  get: function(){return global.mongodb.collection('vacations');}
});

Vacation.save = function(o, cb){
  var v = new Vacation(o);
  Vacation.collection.save(v, function(){
    //console.log(v);
    cb(v);
  });
};

Vacation.all = function(cb){
  Vacation.collection.find().toArray(cb);
};

Vacation.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Vacation.collection.findOne({_id:_id}, function(err, obj){
    cb(err, _.create(Vacation.prototype, obj));
  });
};

Vacation.prototype.addPhoto = function(url, cb){
  var extensions = url.split('.'),
  extension = extensions[extensions.length -1],
  dir = this._id,
  file = this.photos.length + '.' + extension,
  self = this;

  cp.execFile(__dirname + '/../scripts/download.sh', [url, file, dir], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
    var photo = '/img/' + dir + '/' + file;
    self.photos.push(photo);
    Vacation.collection.save(self, cb);
  });
};

module.exports = Vacation;

