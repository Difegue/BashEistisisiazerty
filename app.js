var express = require('express'); 
var mime = require('mime'); 
var bodyParser = require('body-parser'); 
var session = require('express-session'); 
var mysql = require('mysql');
var post_bash = require('./bashPost.js');
var get_bash = require('./bashGet.js');
var history = require('./bashHistory.js');
var RSSwag = require('./rss-feeder.js');

var app = express(); 

/**put the host */
global.mysql_host='localhost';
/**the user */
global.mysql_user='basheisti';
/**put the password */
global.mysql_password='B4sheisti';
/**the DB*/
global.mysql_database='faucheisti_prod_basheisti';

/*Generer RSS*/
RSSwag.createRSS();

/* On utilise les cookies, les sessions et les formulaires */
 app.use(express.static(__dirname + '/public')).set('views', __dirname + '/views')
.use(bodyParser())
/*bash identifi� par son id*/
.get('/bash',get_bash.manageGet)
/*acces au formulaire */
.get('/bashing', function(req, res) {
	console.log("GET  /bashing, IP is : "+req.connection.remoteAddress+" ["+new Date().toUTCString() +"]");
    res.render('bashForm.ejs');
})
.get('/bashistory',history.getHistory)
/* Research bash by name */
.post('/bashsearch',history.search)
/* Bash au random */
.get('/random',history.getRandom)
/* send de bash */ 
.post('/bashing',function(req,res){post_bash.managePost(req,res,RSSwag);})
/* flux RSS */
.get('/rss',RSSwag.getRSS)
/* On redirige vers le formulaire si la page demand�e n'est pas trouv�e */ 
.use(function(req, res, next){res.redirect('/bashing');})
.listen(6951);