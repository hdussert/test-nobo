const expect  = require('chai').expect;
const request = require('request');

const Errors = require('../errors');

// TESTS FOR P1
describe('P1 - http://localhost:4242/api/p1', function () {
  it('parameters missing', function (done) {
    request('http://localhost:4242/api/p1' , function (error, response, body) {
      expect(body).to.equal(Errors.P1.NO_PARAMETERS);
      done();
    });
  });  
  it('str missing', function (done) {
    request('http://localhost:4242/api/p1?n=8' , function (error, response, body) {
      expect(body).to.equal(Errors.P1.STR_IS_MISSING);
      done();
    });
  });
  it('n missing', function (done) {
    request('http://localhost:4242/api/p1?str=test' , function (error, response, body) {
      expect(body).to.equal(Errors.P1.N_IS_MISSING);
      done();
    });
  });
  it('n is not a number', function (done) {
    request('http://localhost:4242/api/p1?str=test&n=asdsa' , function (error, response, body) {
      expect(body).to.equal(Errors.P1.N_IS_NAN);
      done();
    });
  });
  it('n under 1', function (done) {
    request('http://localhost:4242/api/p1?str=test&n=0' , function (error, response, body) {
      expect(body).to.equal(Errors.P1.N_TO_LOW);
      done();
    });
  });
  it('n over 20', function (done) {
    request('http://localhost:4242/api/p1?str=test&n=21' , function (error, response, body) {
      expect(body).to.equal(Errors.P1.N_TO_HIGH);
      done();
    });
  });
  it('valid (str: "test", n: 8) >0.5', function (done) {
    request('http://localhost:4242/api/p1?str=test&n=8' , function (error, response, body) {
        expect(body).to.equal('0.5');
        done();
    });
  });
  it('valid (str: "t", n: 3) >0.333', function (done) {
    request('http://localhost:4242/api/p1?str=t&n=3' , function (error, response, body) {
        expect(body).to.equal('0.333');
        done();
    });
  });
  it('valid (str: "blablablablabla", n: 3) >5', function (done) {
    request('http://localhost:4242/api/p1?str=blablablablabla&n=3' , function (error, response, body) {
        expect(body).to.equal('5');
        done();
    });
  });
})

// TESTS FOR P2
describe('P2 - http://localhost:4242/api/p2', function() {
  it('date_start missing', function (done) {
    request('http://localhost:4242/api/p2' , function (error, response, body) {
      expect(body).to.equal(Errors.P2.DATE_START_MISSING);
      done();
    });
  });
  it('invalid date_start', function (done) {
    request('http://localhost:4242/api/p2?date_start=26-10' , function (error, response, body) {
      expect(body).to.equal(Errors.P2.INVALID_DATE_START);
      done();
    });
  });
  it('invalid date_end', function (done) {
    request('http://localhost:4242/api/p2?date_start=2020-06-10&date_end=26-25' , function (error, response, body) {
      expect(body).to.equal(Errors.P2.INVALID_DATE_END);
      done();
    });
  });
  it('date_start missing', function (done) {
    request('http://localhost:4242/api/p2?date_end=2020-07-25' , function (error, response, body) {
      expect(body).to.equal(Errors.P2.DATE_START_MISSING);
      done();
    });
  });
  it('valid (date_start: "2020-06-01", date_end: "2020-07-31") >0 jours', function (done) {
    request('http://localhost:4242/api/p2?date_start=2020-06-01&date_end=2020-07-31' , function (error, response, body) {
      expect(body).to.equal('0 jours');
      done();
    });
  });
  it('valid (date_start: "2020-06-10", date_end: "2020-07-25") >15 jours', function (done) {
    request('http://localhost:4242/api/p2?date_start=2020-06-10&date_end=2020-07-25' , function (error, response, body) {
      expect(body).to.equal('15 jours');
      done();
    });
  });
  it('valid (date_start: "2020-06-10", date_end: "2020-07-25") >15 jours', function (done) {
    request('http://localhost:4242/api/p2?date_start=2020-06-10&date_end=2020-07-25' , function (error, response, body) {
      expect(body).to.equal('15 jours');
      done();
    });
  });
  it('valid (date_start: "2020-06-10", date_end: "2020-07-25 0:0") >15 jours', function (done) {
    request('http://localhost:4242/api/p2?date_start=2020-06-10&date_end=2020-07-25%200:00' , function (error, response, body) {
      expect(body).to.equal('15 jours');
      done();
    });
  });
  it('valid (date_start: "2020-06-10", date_end: "2020-07-25 20:00") >14 jours, 4 heures', function (done) {
    request('http://localhost:4242/api/p2?date_start=2020-06-10&date_end=2020-07-25%2020:00' , function (error, response, body) {
      expect(body).to.equal('14 jours, 4 heures');
      done();
    });
  });
  it('valid (date_start: "2020-06-01", date_end: "2020-07-30 20:00") >4 heures', function (done) {
    request('http://localhost:4242/api/p2?date_start=2020-06-01&date_end=2020-07-30%2020:00' , function (error, response, body) {
      expect(body).to.equal('4 heures');
      done();
    });
  });
  it('valid (date_start: "2020-06-10") >9 jours', function (done) {
    request('http://localhost:4242/api/p2?date_start=2020-06-10' , function (error, response, body) {
      expect(body).to.equal('9 jours');
      done();
    });
  });
  it('valid (date_start: "2020-06-01") >0 jours', function (done) {
    request('http://localhost:4242/api/p2?date_start=2020-06-01' , function (error, response, body) {
      expect(body).to.equal('0 jours');
      done();
    });
  });
})