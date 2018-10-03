var compression = require('compression');
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 8000);
// app.use(express.static(path.join(__dirname, 'frontend'), { maxAge: 3600000 }));