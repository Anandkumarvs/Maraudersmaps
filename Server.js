const Exp= require('Express');
const path= require('path');
const serv = Exp();
const bodyParser=require('body-parser');
const admin = require("firebase-admin"); 

var host='localhost';

//Body Parser Middleware
serv.use(bodyParser.urlencoded({ extended: false }));
serv.use(bodyParser.json());

//EJS Middleware
serv.set('view engine','ejs');
serv.set('views',path.join(__dirname,'/Src'));

//Firebase Middleware

var serviceAccount = require(path.join(__dirname,'marauder-s-map-b1d80-firebase-adminsdk-1rp6w-3e1d267630.json'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://marauder-s-map-b1d80.firebaseio.com"
});
var db = admin.firestore();


serv.get('/home',function(req,res){
    var query= db.collection('User').doc('Harry');
    var data= query.get().then( doc => { res.render( 'HomePage' , { object : doc.data() } ) });
    

  //  res.render('HomePage',{});
});  

serv.listen(3000,host,function(){
    console.log('Server Started!! Marauder\'s map is Online');
    console.log("The server started at "+ Date());
});

