'use strict';

var expect = require('chai').expect;
const Book = require('../models/book');
require("dotenv").config({ path: "./.env" });

module.exports = function (app) {

  app.route('/api/books')
    .get((req, res) => {
      Book.find({}, (err, books) => {
        return (err || !books)? res.send('no books found') : res.json(books);        
      })
    })
  
    .post((req, res) => {
      const { title } = req.body;

      if(!title) {
        return res.send('invalid title')
      }
      
      new Book({title: title}).save((err, book) => {
        return (err)? res.send('invalid title') : res.json(book);
      });
    }) //end of .post
    
    .delete((req, res) => {
      Book.deleteMany(({}), err => {
        return (err)? res.send('complete delete failed') : res.send('complete delete successful');
      })
    });

  app.route('/api/books/:id')
    .get((req, res) => {
      const bookid = req.params.id;

      if(!bookid) return res.send('no book exists')

      Book.findById(bookid, (err, book) => {
        return (err || !book)? res.send('no book exists') : res.json(book);
      });
    }) //end of .get
    
    .post((req, res) => {
      const bookid = req.params.id;
      const { comment } = req.body;

      Book.findById(bookid, (err, book) => {
        if(err || !book) return res.send('no book exists');

        if(comment) {
          book.comments.push(comment);
          book.commentcount++;
        }

        book.save(err => {
          return (err)? res.send('could not add comment') : res.json(book)
        })
      });
    }) //end of .post
    
    .delete((req, res) => {
      const bookid = req.params.id;
      if(!bookid) return res.send('no book exists');
  
      Book.deleteOne({ _id: bookid }, err => {
        return (err)? res.send('no book exists') : res.send('delete successful');
      });
    }); //end of .delete
}; //end of function (app)