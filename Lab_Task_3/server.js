const express = require("express");
let server = express();
const mongoose = require('mongoose');
const productRoute = require('./routes/admin/adminProductRoutes.js');
const adminCategoryRoutes = require('./routes/admin/adminCategoryRoutes.js'); 
const methodOverride = require('method-override');
require('dotenv').config();



// MIDDLEWARE ******************************************
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(methodOverride('_method'));   // This tells Express to look for _method in the request body


// Serve static files from the 'public' folder
server.use(express.static("public"));

// Set the view engine to EJS
server.set("view engine", "ejs");


//ROUTES **************************************************
server.use('/admin/products', productRoute);
server.use('/admin/category', adminCategoryRoutes);

// Route for the '/about-me' page
server.get("/about-me", (req, res) => {
  res.render("portfolio"); // Make sure the file name is portfolio.ejs
});

// Route for the home page
server.get("/", (req, res) => {
  res.render("Apple"); // Render Apple.ejs file
});

// Route for back-end Product page
server.get('/products', (res,req) => {
  res.render("admin/manageProducts");
})

// Connecting to MongoDB

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log('Connected to the Database!')
  // Start Server after connecting to Database
  server.listen(5000, () => {
    console.log(`Server Started at localhost:5000`);
  });
})
  .catch((error) => console.log(error.message));


