const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/g1'));

app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',router)

router.get('/api/data/temperature',function(req,res) {
	res.sendFile(path.join(__dirname+'/dist/g1/assets/temperature.json'))
})
router.get('/api/data/precipitation',function(req,res) {
	res.sendFile(path.join(__dirname+'/dist/g1/assets/precipitation.json'))
})

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/g1/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('started 8080')