const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => console.log(err));
