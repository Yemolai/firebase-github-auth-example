const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

function readEnvFile(envPath = '.env') {
  try {
    const filePath = path.join(__dirname, envPath);
    console.info('loading env from:', filePath);
    const envFileContents = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const envKeyValuePairs = envFileContents
      .replace('\n\n', '\n')
      .split('\n')
      .filter((line) => !line.trim().startsWith('#'))
      .map((line) => {
        const firstEqualSeparator = line.indexOf('=');
        const key = line.slice(0, firstEqualSeparator).trim();
        const value = line.slice(firstEqualSeparator + 1).trim();
        return [key, value];
      })
    return Object.fromEntries(envKeyValuePairs);
  } catch (_error) {
    console.warn(`Env file "${path}" not found`);
    return {};
  }
}

const ENV = Object.freeze({
  ...process.env,
  ...readEnvFile(),
});

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);

app.use('/js/firebase-setup.js', (_req, res) => {
  const { FIREBASE_CONFIG: stringifiedConfig = null } = ENV;
  if (!stringifiedConfig) {
    return res.status(500).json({ message: 'missing firebase config in env' });
  }
  const firebaseConfig = JSON.parse(stringifiedConfig);
  return res.setHeader('Content-type', 'application/javascript').status(200).send(`
    var firebaseConfig = ${JSON.stringify(firebaseConfig)};
    firebase.initializeApp(firebaseConfig);
  `.trim());
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
