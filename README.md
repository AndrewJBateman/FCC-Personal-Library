# :zap: Nodejs Information Security and Quality Assurance

* Node.js app to ... and store data in a MongoDB database as part of a FreeCodeCamp exercise for Front End Certification.

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

* Original instructions from FCC:

1) ADD YOUR MongoDB connection string to .env without quotes as db
    `example: DB=mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib`
2) SET NODE_ENV to `test` without quotes
3) You need to create all routes within `routes/api.js`
4) You will add any security features to `server.js`
5) You will create all of the functional tests in `tests/2_functional-tests.js`

* MongoDB Cloud Atlas database set up using google cloud.

## :camera: Screenshots

![Example screenshot](./images/books.png).
![Example screenshot](./images/postman.png).

## :signal_strength: Technologies

* [Node v12](https://nodejs.org/en/) javaScript runtime built on Chrome's V8 JavaScript engine
* [mongoose v5](https://mongoosejs.com/) object modelling for node.js.
* [Helmet v3](https://helmetjs.github.io/) Express.js security with HTTP headers.
* [Cors v2](https://www.npmjs.com/package/cors) node.js package for providing Connect/Express middleware that can be used to enable CORS with various options.
* [jQuery v3](https://jquery.com/) Javascript library

## :floppy_disk: Setup

* Create MongoDB Atlas Cloud database (or local installed MongoDB database) and add user access/database credentials (USER_NAME, USER_PASSWORD, DB_CLUSTER, PORT & DB_NAME) to a new `.env` file. This is used in `server.js`.
* Add IP address to MongoDB Atlas Network Access whitelist. Or simply whitelist all (IP address 0.0.0.0/0).
* Run `node server.js` for a dev server. Navigate to `http://localhost:4000/`. The app will automatically reload if you change any of the source files.

## :computer: Code Examples

* extract from `server.js` ..

```javascript

```

## :cool: Features

* MongoDB cluster set up with username and password

## :clipboard: Status & To-Do List

* Status:
* To-Do: dd

## :clap: Inspiration

* f

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
