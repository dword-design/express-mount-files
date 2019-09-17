const express = require('express');
const middleware = require('..');
const cons = require('consolidate');
const path = require('path');
const { setup } = require('./lib/ava-supertest');

module.exports = function() {
  return function(t) {
    const app = express();
    // Configure a view engine
    app.engine('njk', cons.nunjucks);
    // set .html as the default extension
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '/routes'));
    // Set up our middleware for testing
    app.use(middleware('routes', { cwd: __dirname }));
    // Add a catch-all 404
    app.use((req, res) => res.sendStatus(404));
    // Prepare the supertest agent for querying
    setup(app)(t);
  };
};
