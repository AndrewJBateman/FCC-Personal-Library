# :zap: Nodejs Information Security and Quality Assurance

* Node.js app to store and access book data as json objects in a MongoDB database
* Part of a FreeCodeCamp exercise for Front End Certification.

*** Note: to open web links in a new window use: _ctrl+click on link_**

## :page_facing_up: Table of contents

* [:zap: Nodejs Information Security and Quality Assurance](#zap-nodejs-information-security-and-quality-assurance)
	* [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
	* [:books: General info](#books-general-info)
	* [:camera: Screenshots](#camera-screenshots)
	* [:signal_strength: Technologies](#signal_strength-technologies)
	* [:floppy_disk: Setup](#floppy_disk-setup)
	* [:computer: Code Examples](#computer-code-examples)
	* [:cool: Features](#cool-features)
	* [:clipboard: Status & To-Do List](#clipboard-status--to-do-list)
	* [:clap: Inspiration](#clap-inspiration)
	* [:envelope: Contact](#envelope-contact)

## :books: General info

* This project is no longer part of the Free Code Camp Front End Certification. Original instructions from FCC:

1) ADD YOUR MongoDB connection string to .env without quotes as db
    `example: DB=mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib`
2) SET NODE_ENV to `test` without quotes
3) You need to create all routes within `routes/api.js`
4) You will add any security features to `server.js`
5) You will create all of the functional tests in `tests/2_functional-tests.js`

* MongoDB Cloud Atlas database set up to use Google Cloud Storage.

## :camera: Screenshots

![Example screenshot](./img/books.png).
![Example screenshot](./img/postman.png).

## :signal_strength: Technologies

* [Node v12](https://nodejs.org/en/) javaScript runtime built on Chrome's V8 JavaScript engine
* [Express v4](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js
* [mongoose v5](https://mongoosejs.com/) object modelling for node.js.
* [Helmet v4](https://helmetjs.github.io/) Express.js security with HTTP headers.
* [nocache v2](https://www.npmjs.com/package/nocache) Middleware to turn off caching (was part of Helmet)
* [Cors v2](https://www.npmjs.com/package/cors) node.js package for providing Connect/Express middleware that can be used to enable CORS with various options.
* [jQuery v3](https://jquery.com/) Javascript library

## :floppy_disk: Setup

* Create MongoDB Atlas Cloud database (or local installed MongoDB database) and add user access/database credentials (USER_NAME, USER_PASSWORD, DB_CLUSTER, PORT & DB_NAME) to a new `.env` file. This is used in `server.js`.
* Add IP address to MongoDB Atlas Network Access whitelist. Or simply whitelist all (IP address 0.0.0.0/0).
* Run `node server.js` for a dev server. Navigate to `http://localhost:4000/`.
* The app will automatically reload if you change any of the source files.

## :computer: Code Examples

* extract from `routes/api.js` showing routes to find a json book object in the database using its id, post a comment or delete the entire book object using its id.

```javascript
app
	.route('/api/books/:id')
	.get((req, res) => {
		const bookid = req.params.id;

		if (!bookid) return res.send('no book exists');

		Book.findById(bookid, (err, book) => {
			return err || !book ? res.send('no book exists') : res.json(book);
		});
	})

	.post((req, res) => {
		const bookid = req.params.id;
		const { comment } = req.body;

		Book.findById(bookid, (err, book) => {
			if (err || !book) return res.send('no book exists');

			if (comment) {
				book.comments.push(comment);
				book.commentcount++;
			}

			book.save((err) => {
				return err ? res.send('could not add comment') : res.json(book);
			});
		});
	})

	.delete((req, res) => {
		const bookid = req.params.id;
		if (!bookid) return res.send('no book exists');

		Book.deleteOne({ _id: bookid }, (err) => {
			return err ? res.send('no book exists') : res.send('delete successful');
		});
	});
```

## :cool: Features

* MongoDB cluster set up with username and password

## :clipboard: Status & To-Do List

* Status: Working. Dependencies all up to date.
* To-Do: nothing

## :clap: Inspiration

* [freeCodeCamp's curriculum](https://www.freecodecamp.org/learn/) - although it has changed in the years since I completed this challlenge.

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
