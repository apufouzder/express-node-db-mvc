const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

const toolsRoutes = require('./routes/v1/tools.route.js');
const viewCount = require("./middleware/viewCount");
const { rateLimit } = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");
const { connectToServer } = require("./utils/dbConnect");


app.use(cors());
app.use(express.json());
// app.use(express.static("public"));
app.set("view engine", "ejs");

// app.use(viewCount);
// Apply the rate limiting middleware to all requests
// app.use(limiter)


connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } else { 
    console.log(err);
  }
});


app.use("/api/v1/tools", toolsRoutes);


app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/public/index.html");
  res.render("home.ejs", {
    id: 2,
    user: {
      name: "Apu",
    }
  });
});

// No route found 
app.all("*", (req, res) => { 
  res.send("Route not found!");
})

// error handling middleware
app.use(errorHandler);



// other error handlers like database...
process.on('unhandledRejection', (error) => { 
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  })
})