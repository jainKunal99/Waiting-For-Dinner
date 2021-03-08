  if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const faker = require('faker');
const app = express()
const router = require('express').Router();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
mongoose.connect("mongodb+srv://root:rooted@wfd-qmifj.mongodb.net/WFD?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
//Schema for a particular dish
var dishSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  cuisine: String,
  isVegetarian: Boolean,
  likes: Number,
  dislies: Number

});

//Schema to create users
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

//Schema to create new Orders
var orderSchema = new mongoose.Schema({
  user: mongoose.ObjectId,
  orderId: String,
  orderType: String,
  dateTimeString: String,
  orderSummary: { itemNames: { type: Array, "default": [] }, itemPrices: { type: Array, "default": [] }, itemQuantities: { type: Array, "default": [] }, itemTotals: { type: Array, "default": [] }, gTotal: Number },
  cName: String,
  cEmail: String,
  extraRequirements: String,
  status: Number,

}, { timestamps: true });

//Schema to create monthly stats
var logSchema = new mongoose.Schema({
  sales: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  day: Number,
  month: Number,
  year: Number
});
var itemSchema = new mongoose.Schema({
  name: String,
  value: Number,
  quantity: Number
});

var reservationDetails = new mongoose.Schema({
  name: String,
  email: String,
  bookedAt: String,
  timeSlot: Number,
  tableName: String,
  date: String,
  reservationId: String,
  requirements: Object

});

//Schema for table reservations
var dayWiseReservationsStatus = new mongoose.Schema({
  dateTomorrow: { type: String, unique: true },
  table1: Array,
  table2: Array,
  table3: Array,
  table4: Array,
  table5: Array,
  table6: Array,
  table7: Array,
  table8: Array,
  table9: Array,
  table10: Array
});


//creation of a new dish in the database
var dish = mongoose.model("dish", dishSchema);
//creation of a new dish in the database
var user = mongoose.model("user", userSchema);
//creation of a new order in the database
var chefOrder = mongoose.model("chefOrder", orderSchema);
//creation of a new stat in the database
var log = mongoose.model("log", logSchema);
//creation of a new item in the database
var item = mongoose.model("item", itemSchema);
var reservationStatus = mongoose.model("reservationStatus", dayWiseReservationsStatus)
var bookingDetails = mongoose.model("bookingDetails", reservationDetails);

/*
item.create({
  name: "milk",
  value: 60,
  quantity: 40

}, (err, c)=>{
if(err){
  console.log(err);
}
else{
  console.log("Newly created item!");
  console.log(c); 
}
});
*/
/*
var date = new Date();
log.create({
    sales: 16000,
    cost: 11000,
    day: date.getDate()-2,
    month: date.getMonth(),
    year: date.getFullYear()

}, (err, c)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log("Newly created log dish!");
    console.log(c); 
  }
});
*/


/*
dish.create({
  name: "Vada Pav",
    image: "https://eattreat.in/wp-content/uploads/2018/04/vada-pav3.jpg",
    price: 25,
    cuisine: "Chaat",
    isVegetarian: true,
    likes: 122,
    dislies: 3

}, (err, c)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log("Newly created punjabi dish!");
    console.log(c); 
  }
});
/*

/*
https://www.mozismenu.com/wp-content/uploads/2017/04/Chicken-Keema-Samosa-0.jpg
https://tanusrecipes.com/wp-content/uploads/2017/03/Sev-Puri.jpg"
*/
//ROUTE TO HANDLE HTTP REQUEST FROM MENU PAGE FOR UPDATING THE RATING.

var today = new Date();
var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
var s = tomorrow + "";
var month = s.substring(4, 7);
var day = s.substring(8, 10);
var year = s.substring(11, 15);
s = day + "-" + month + "-" + year;



var arr1 = [];
var arr2 = [];
var arr3 = [];
var arr4 = [];
var orderID;
var grandTotal = 0;
var customerName;
var customerEmail;
var customerUID = mongoose.Types.ObjectId("5e2ea290d60c063c50d31436");
var userId;
var dateTimeString;

reservationStatus.create({
  dateTomorrow: s,
  table1: [1, 1, 1, 1, 1],
  table2: [1, 1, 1, 1, 1],
  table3: [1, 1, 1, 1, 1],
  table4: [1, 1, 1, 1, 1],
  table5: [1, 1, 1, 1, 1],
  table6: [1, 1, 1, 1, 1],
  table7: [1, 1, 1, 1, 1],
  table8: [1, 1, 1, 1, 1],
  table9: [1, 1, 1, 1, 1],
  table10: [1, 1, 1, 1, 1]

}, (err, c) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Newly created reservation day!");
    console.log(c);
  }
});

app.get('/test', function (req, res) {
 
  for(var i=0;i<100000000;++i){};
  res.render('check.ejs', { 
    arr1: arr1,
    arr2: arr2,
    arr3: arr3,
    arr4: arr4,
    grandTotal: grandTotal,
    customerName: customerName,
    customerEmail: customerEmail,
    orderID: orderID,
    dateTimeString: dateTimeString});

})



//SHUBH
var logData;
//function to calclulate and render monthly statistics
function logMonth(yr, response) {
  log.aggregate([
    { $match: { year: yr } },
    { $group: { _id: '$month', cost: { $sum: '$cost' }, sales: { $sum: '$sales' } } }
  ]).sort('_id').
    then(function (res) {
      response.render('Statistics', { type: "Month", name: "Administrator", stats: res });
    });
}
//function to calclulate and render yearly statistics
function logYear(response) {
  log.aggregate([
    { $group: { _id: '$year', cost: { $sum: '$cost' }, sales: { $sum: '$sales' } } }
  ]).sort('_id').
    then(function (res) {
      response.render('Statistics', { type: "Year", name: "Administrator", stats: res });
    });
}
//function to calclulate and render monthly statistics
function logDay(yr, mn, response) {
  log.find({ year: yr, month: mn }).sort('day').exec(function (err, res) {
    if (err) {
      console.log(err);
      response.redirect('/manager');
    }
    else {
      response.render('Statistics', { type: "Day", name: "Administrator", stats: res });
    }
  });
}
//manager default statistics GET route
app.get('/manager', (req, res) => { res.redirect('/manager/stats'); });
app.get('/manager/stats', function (req, res) {
  logMonth((new Date()).getFullYear(), res);
  // res.render('manager', { name: "Administrator", stats: logData });
});
//manager select option POST route
app.post('/manager/stats', function (req, res) {
  var type = req.body.type;
  //console.log(type);
  var d = new Date();
  if (type == "days") {
    logDay(d.getFullYear(), d.getMonth(), res);
  }
  else if (type == "months") {
    logMonth(d.getFullYear(), res);
  }
  else if (type == "years") {
    logYear(res);
  }

  // res.render('manager', { name: "Administrator", stats: logData });
});
//Bookings Pannel Display Route
app.get('/manager/bookings', (req, res) => {

  bookingDetails.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render('bookingPanel', { name: "Administrator", bookings: docs, dateReserved: s });
    }
  });
});



//TESTING FUNCTION ONLY
function clean() {
  chefOrder.find({ status: null }, (err, ords) => {
    ords.forEach((ord) => {
      console.log(ord);
      chefOrder.findByIdAndDelete(ord._id, (err, doc) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("cleaned");
        }
      });
    });
  });
}
//Chef Pannel GET route
app.get('/chef', function (req, res) {
  clean();
  chefOrder.find({}, (err, orders) => {
    if (err) {
      console.log("Error");
      console.log(err);
    }
    else {
      res.render('chefPanel', { name: "Chef", orders: orders });
    }
  });
});

//Chef Pannel Status update POST route
app.post('/chef/:id/:stat', (req, res) => {
  var id = req.params.id;
  var stat = Number(req.params.stat);

  chefOrder.findByIdAndUpdate(id, { status: stat }, (err, ord) => {
    if (err) {
      console.log(err);
      res.redirect('/chef');
    }
    else {
      console.log(ord);
      res.redirect('/chef');
    }
  });
});

//OrderPanel for the user to view all personal orders
app.get('/orders', (req, res) => {
  chefOrder.find({ user: customerUID }, (err, orders) => {
    if (err) {
      console.log("Error");
      console.log(err);
      //res.redirect('/header');
    }
    else {
      res.render('userPanel', { name: customerName, orders: orders });
    }
  });
});

//Manager Pannel Inventry GET route
app.get('/manager/Inventory', (req, res) => {
  item.find({}, (err, itemso) => {
    if (err) {
      console.log(err);
      res.redirect('/manager');
    }
    else {
      res.render('Inventory', { name: "Administrator", items: itemso })
    }
  });

});

//Manager panel Inventory new Item Post route
app.post('/manager/Inventory', (req, res) => {
  item.create({
    name: req.body.name,
    value: req.body.value,
    quantity: req.body.quantity

  }, (err, c) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Newly created item!");
      console.log(c);
      res.redirect('/manager/Inventory');
    }
  });
});

//Inventry Cost Update function
function logCostUpdate(logCost) {
  console.log("logC==" + logCost);

  var day = new Date();
  var year = day.getFullYear();
  var month = day.getMonth();
  day = day.getDate();
  log.findOneAndUpdate({ year: year, month: month, day: day }, { $inc: { cost: logCost } }, { upsert: true }, (err, doc) => {
    if (err)
      console.log("err" + err);
    else
      console.log("doc" + doc);
  });
}

//Sales for Orders Update function
function logSaleUpdate(logCost) {
  console.log("logS==" + logCost);

  var day = new Date();
  var year = day.getFullYear();
  var month = day.getMonth();
  day = day.getDate();
  log.findOneAndUpdate({ year: year, month: month, day: day }, { $inc: { sales: logCost } }, { upsert: true }, (err, doc) => {
    if (err)
      console.log("err" + err);
    else
      console.log("doc" + doc);
  });
}



//Inventory Update Route
app.post('/manager/Inventory/items', (req, res) => {

  console.log("loggg=" + req.body.logCost);
  if (req.body.Alter == 'sub')
    logCostUpdate(Number(req.body.logCost));
  item.find({}, function (err, items) {
    for (var i = 0; i < items.length; i++) {
      var newQty = req.body[items[i]._id];
      newQty = Number(newQty);

      if (newQty != 0) {
        if (req.body.Alter == 'sub') {
          newQty = items[i].quantity - newQty;
        }
        else if (req.body.Alter == 'add') {
          newQty = Number(items[i].quantity) + Number(newQty);
        }
        item.findByIdAndUpdate(items[i]._id, { $set: { quantity: newQty } }, (err, doc) => {
          if (err)
            console.log(err);
          else
            console.log("doc" + doc);
        });
      }
    }

  });

  res.redirect('/manager/Inventory');
});

//MenuPanel render route
app.get('/manager/menu', (req, res) => {
  dish.find({}, (err, docs) => {
    if (err) {

      console.log(err);
      res.redirect('/manager');
    }
    else {
      res.render('menuPanel', { name: "Administrator", dishes: docs })
    }
  });
});

//Edit menu item
app.get('/manager/menu/:id', (req, res) => {
  console.log("Dish Deletion Route");
  dish.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {

      console.log(err);
      res.redirect('/manager/menu');
    }
    else {
      console.log("DELETED DISH!!");
      res.redirect('/manager/menu');
    }
  });
});

//New dish Creation
app.post('/manager/menu/new', (req, res) => {
  console.log("POST ROUTE");
  dish.create({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    cuisine: req.body.cuisine,
    isVegetarian: req.body.isVegetarian,
  }, (err, c) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Newly created dish!");
      console.log(c);
    }
  });
  res.redirect('/manager/menu');

});

//edit price menu post route
app.post('/manager/menu', (req, res) => {
  dish.find({}, (err, dishes) => {
    if (err) {
      console.log(err)
      res.redirect('/manager/menu');
    }
    else {
      for (var i = 0; i < dishes.length; i++) {
        var p = req.body[dishes[i]._id];
        if (p != dishes[i].price) {
          dish.findByIdAndUpdate(dishes[i]._id, { price: p }, (err, doc) => {
            if (err) {
              console.log(err);
              res.redirect('/manager/menu');
            }
          });

        }
      }

      res.redirect('/manager/menu');
    }
  });
});

//Shubh

//Pallavi
app.get('/feedback', (req, res) => { res.render('feedback', { name: customerName }); });
//Pallavi

//Yash
app.get("/orders/:id", (req, res) => {
  console.log("ID:----" + req.params.id);
  chefOrder.findById(req.params.id, (err, doc) => {
    if (err)
      console.log(err);
    else
      res.render('track', {
        order: doc
      })
  });
});
//Yash



app.post('/testing', function (req, res) {
  arr1 = [];
  arr2 = [];
  arr3 = [];
  arr4 = [];
  arr1 = req.body.ItemNames;
  arr2 = req.body.ItemPrices;
  arr3 = req.body.ItemQuantities;
  grandTotal = 0;
  //calculation of grand tota of bill
  for (var j = 0; j < arr1.length; ++j) {
    arr4[j] = arr2[j] * arr3[j];
    grandTotal += arr4[j];
  }
  logSaleUpdate(grandTotal);
  console.log('----------------');
  // create a new order entry for the placed order
  orderID = 'ORDER-' + faker.finance.account();
  dateTimeString = faker.date.recent();
  
  chefOrder.create({
    user: customerUID,
    orderId: orderID,
    orderType: req.body.orderType,
    dateTimeString: dateTimeString,
    orderSummary: { itemNames: arr1, itemPrices: arr2, itemQuantities: arr3, itemTotals: arr4, gTotal: grandTotal },
    cName: customerName,
    cEmail: customerEmail,
    status: 0,
    extraRequirements: req.body.x,

  }, { timestamps: true }, (err, c) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Newly created order for chef panel!");
      console.log(c);
    }
  });

  clean();

})

//route to reach to the lading page
app.get("/menu", function (req, res) {
  // res.render('menu');
  dish.find({}, function (err, dish) {
    if (err) {
      console.log(err);
    } else {

      res.render("menu", { dish: dish });
    }
  });
});

//--start--//
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

/*
 reservationStatus.findByIdAndUpdate(bookingId, { [tableName]: temp }, (err, searchedObject) => {
          if (err)
          console.log(err);
          else{
            console.log(searchedObject);
          }
        });  */






var users = []
var DISHES = [];


dish.find({}, function (err, d) {

  if (err) {
    console.log("Error");
    console.log(err);
  }
  else {
    console.log("All The dishes");
    DISHES = d;
  }
});

user.find({}, function (err, u) {

  if (err) {
    console.log("Error");
    console.log(err);
  }
  else
    users = u;
});

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('landing.ejs')
})

app.get('/login', checkNotAuthenticated, (req, res) => {

  user.find({}, function (err, u) {

    if (err) {
      console.log("Error");
      console.log(err);
    }
    else {
      // console.log(u);
      users = u;
    }
  });
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/header',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/header', checkAuthenticated, (req, res) => {
  customerUID = req.user._id;
  customerName = req.user.name;
  customerEmail = req.user.email;
  grandTotal = 0
  res.render('header.ejs', {
    name: req.user.name,
    DISHES: DISHES
  });
});

app.get('/register', checkNotAuthenticated, (req, res) => {

  user.find({}, function (err, u) {

    if (err) {
      console.log("Error");
      console.log(err);
    }
    else {
      // console.log(u);
      users = u;
    }
  });
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    user.create({

      name: req.body.name,
      email: req.body.email,
      password: hashedPassword

    }, (err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Newly created user!");
        console.log(user);
      }
    });
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/header');
  }
  next()
}


//KUNAL NEW

app.get('/myBookings', function (req, res) {

  bookingDetails.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render('myBookings.ejs', { name: customerName, bookings: docs, dateReserved: s });
    }
  });

})


app.post('/myBookings/:id', function(req, res){

  var bookingId = req.params.id;
  bookingDetails.findByIdAndDelete(bookingId, function(err,s){
    if(err){
      console.log(err);
    }else{
      console.log(s);
      bookingDetails.find({},function(err,schedule){
        if(err){
          console.log(err);

        }else{
          res.render('myBookings.ejs',{name: customerName,bookings: schedule, dateReserved: s});
        }
      })
    }
  });
});


app.get('/booking', function (req, res) {

  reservationStatus.find({ dateTomorrow: s }, function (err, schedule) {
    if (err) {
      console.log("Error");
      console.log(err);
    }
    else {
      res.render('booking.ejs', { name: customerName, x: schedule });
    }
  });
})


var tbName;
var tSlot;
var reqs;

app.post('/updateReservationStatus', function (req, res) {

  var bookingId;
  var searchedObject;
  var postedString = req.body.ID;
  reqs = req.body.requirements;
  console.log("##############################################################################");
  console.log(reqs);
  console.log("##############################################################################");
  var timeSlot = parseInt(postedString.substring(0, 1), 10);
  tSlot = timeSlot;
  var tableName = postedString.substring(2, (postedString.length));
  tbName = tableName;
  reservationStatus.findOne({ "dateTomorrow": s }, function (err, schedule) {
    if (err) {
      console.log("Error");
      console.log(err);
    }
    else {
      bookingId = schedule._id;
      searchedObject = schedule;
      var temp = schedule[tableName];
      temp[timeSlot] = 0;
      reservationStatus.findByIdAndUpdate(bookingId, { [tableName]: temp }, (err, searchedObject) => {
        if (err)
          console.log(err);
        else {
          console.log(searchedObject);
        }
      });
    }
  });
})


app.get('/checkout2', function (req, res) {
  var str = 'TABLE-RESERVATION-' + faker.finance.account();
  var obj = {
    name: customerName,
    email: customerEmail,
    bookedAt: faker.date.recent(),
    timeSlot: tSlot,
    tableName: tbName,
    date: s,
    reservationId: str
  }
  bookingDetails.create({
    name: customerName,
    email: customerEmail,
    bookedAt: faker.date.recent(),
    timeSlot: tSlot,
    tableName: tbName,
    date: s,
    reservationId: str,
    requirements: reqs
  }, (err, r) => {
    if (err) {
      console.log('Error');
      console.log(err);
    } else {
      console.log('Successfully stored new table booking details');
      console.log(r);
    }
  });
  res.render('checkout2.ejs', { obj: obj });

});


//--KUNAL NEW--


app.post('/myBookings/:id', function(req, res){

    var rId;
    var bookingId = req.params.id;
    var searchedObject;
    var postedString = req.body.ID;
    bookingDetails.findById(bookingId, function(err, returnedObj){
        tSlot = returnedObj.timeSlot;
        tbName = returnedObj.tableName;

    });
    reservationStatus.findOne({ "dateTomorrow": s }, function (err, schedule) {
      if (err) {
        console.log("Error");
        console.log(err);
      }
      else {
          searchedObject = schedule;
          var temp = schedule[tbName];
          temp[tSlot] = 1;
          reservationStatus.findOne({ "dateTomorrow": s }, { [tbName]: temp }, (err, searchedObject) => {
            if (err)
            console.log(err);
            else{
              console.log(searchedObject);
            }
          }); 
      }
    });
    
});

var doc;





app.get('/*', (req, res) => {
  res.render('error', { name: customerName });
});
app.listen(3001, () => {
  console.log("Serving demo on port 3001");
});




/*

echo "# Waiting-For-Dinner" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jainKunal99/waiting-for-dinner.git
git push -u origin mainc
In-restaurent ordering automated using RFID sensors >Table-Booking automated >Inventory management >Sales statistics >Ordering portal >Integrated payments >Feedback >Home-Delivery >Manager-panel > Chef panel
*/