var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  let id;
  //let _id1="5bc45fe31eb4e23daac6e43c";
  let _id1;

  suite('Routing tests', function() { //test 1
    suite('POST /api/books with title => create book object/expect book object', () => {
      test('Test POST /api/books with title', (done) => {
        chai.request(server)
        .post('/api/books')
        .send({ title: 'Title 1' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.title, 'Title 1');
          assert.isArray(res.body.comments);
          assert.property(res.body, '_id');
          _id1 = res.body._id
          done();
        });
      });
      
      test('Test POST /api/books with no title given', (done)  => { //test 2
        chai.request(server)
        .post('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid title');
          done();
        });
      });
    });

    suite('GET /api/books => array of books', function(){ //test 3
      test('Test GET /api/books',  (done) => {
        chai.request(server)
        .get('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'commentcount', 'Each book array should contain a commentcount');
          assert.property(res.body[0], '_id', 'Each book array should contain an _id');
          assert.property(res.body[0], 'title', 'Each book array should contain a title');
          assert.equal(res.body[0].commentcount, 0, 'comment count should initially be zero');
          done();
        });
      });      
    });

    suite('GET /api/books/[id] => book object with [id]', function(){      
      test('Test GET /api/books/[id] with id not in db', (done) => { //test 4
        chai.request(server)
        .get('/api/books/fake')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db', (done) => { //test 5
        chai.request(server)
        .get(`/api/books/${_id1}`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'title', 'Each book array should contain a title');
          assert.property(res.body, '_id', 'Each book array should contain an _id');
          assert.property(res.body, 'commentcount', 'Each book array should contain a commentcount');
          assert.equal(res.body._id, _id1);
          assert.isArray(res.body.comments);
          assert.equal(res.body.title, 'Title 1');
          done();
        });
      });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){ //test 6
      test('Test POST /api/books/[id] with comment', (done) => {
        chai.request(server)
        .post(`/api/books/${_id1}`)
        .send({ comment: 'new comment' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'title', 'Each book array should contain a title');
          assert.property(res.body, '_id', 'Each book array should contain an _id');
          assert.property(res.body, 'comments', 'Each book should contain a comments array');
          assert.equal(res.body.title, 'Title 1');
          assert.isArray(res.body.comments);
          assert.equal(res.body.comments[0], 'new comment');
          assert.equal(res.body.commentcount, 1);
          done();
        });
      });
    });

    suite('DELETE /api/books/[id] => delete book object with id', function(){
      test('Test DELETE /api/books/[id]', (done) => {
        chai.request(server)
        .delete(`/api/books/${_id1}`)
        //.send({ _id: id })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'delete successful');
          done();
        });
      }); //end of test
    });
  });
});