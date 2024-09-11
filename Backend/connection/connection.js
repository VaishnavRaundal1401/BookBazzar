const mongoose = require("mongoose");
const connection = async () =>{
    try {
        await mongoose.connect(`${process.env.URI}`);
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
    }
};
connection();