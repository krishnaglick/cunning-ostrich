
'use strict';

process.env.NODE_ENV = 'test';

let should = require('should');
let actionheroPrototype = require('actionhero').actionheroPrototype;
let actionhero = new actionheroPrototype();
let api;

describe('actionhero Tests', function() {
  this.timeout(10000);

  before(function(done){
    actionhero.start(function(err, a) {
      err && console.log(err);
      api = a;
      done();
    });
  });

  after(function(done){
    actionhero.stop(function(err){
      done();
    });
  })

  it('should have booted into the test env', function(){
    process.env.NODE_ENV.should.equal('test');
    api.env.should.equal('test');
    should.exist(api.id);
  });

  it('can retrieve server uptime via the status action', function(done){
    api.specHelper.runAction('status', function(response){
      should.not.exist(response.error);
      response.uptime.should.be.above(0);
      done();
    });
  });

});
