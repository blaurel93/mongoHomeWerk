const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

const app = express();




app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

// routes
// require("./models")(app);
// require("./routes/apiRoutes.js")(app);
app.use(require("./routes/apiRoutes.js"))
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});