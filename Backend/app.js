const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./connection/connection");

const user = require("./routes/user");
const book = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");

app.use(cors());
app.use(express.json());// batana hai ki data json format mai ahra hai
// Create port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`);
});

//routes
app.use("/api/v1", user);

app.use("/api/v1", book);

app.use("/api/v1", favourite);

app.use("/api/v1", cart);

app.use("/api/v1", order);