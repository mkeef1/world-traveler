/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Vacation  = require('../../app/models/vacation'),
    dbConnect = require('../../app/lib/mongodb'),
    //Mongo     = require('mongodb'),
    cp        = require('child_process'),
    db        = 'vacations-test';

describe('Vacation', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new vacation', function(){
      var v = new Vacation({name:'Florida', lat:3, lng:4, start:'10/10/2014', end:'10/11/2014', photos:['a1.img', 'a2.img']});
      expect(v).to.be.instanceof(Vacation);
    });
  });

  describe('.all', function(){
    it('should get all vacations', function(done){
      Vacation.all(function(err, vacations){
        expect(vacations).to.have.length(3);
        done();
      });
    });
  });

  describe('.save', function(){
    it('should add a vaction to the database', function(done){
      var v = new Vacation({name:'Florida', lat:3, lng:4, start:'10/10/2014', end:'10/11/2014', photos:['a1', 'a2']});
      Vacation.save(v, function(err, vacation){
        expect(v.name).to.equal('Florida');
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a vacation by its id', function(done){
      Vacation.findById('000000000000000000000001', function(err, vacation){
        expect(vacation.name).to.equal('Nashville, TN, USA');
        done();
      });
    });
  });
});

