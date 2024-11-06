const express = require("express");
let server = express();

// Set the view engine to EJS
server.set("view engine", "ejs");

// Serve static files from the 'public' folder
server.use(express.static("public"));

// Route for the '/about-me' page
server.get("/about-me", (req, res) => {
  res.render("portfolio"); // Make sure the file name is portfolio.ejs
});

// Route for the home page
server.get("/", (req, res) => {
  res.render("Apple"); // Render Apple.ejs file
});

// Start the server
server.listen(5000, () => {
  console.log(`Server Started at localhost:5000`);
});
