const router = require("express").Router();
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");
const {authToken} = require("./userAuth");

//place order
router.post("/place-order", authToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const {order} = req.body;
        for(const orderData of order)
        {
            const newOrder = new Order({user: id, book :orderData._id});
            const orderDatafromDB = await newOrder.save();
            
            //saving order in user model
            await User.findByIdAndUpdate(id, {$push: {orders: orderDatafromDB._id},});
            //clearing cart
            await User.findByIdAndUpdate(id, {$pull: {cart:orderData._id},});
        }
        return res.json({status: "Success", message:"Order Placed Successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server error"});
    }
});

//get order history of perticular user
router.get("/get-order-history", authToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate:{path:"book"},
        });
        
        const ordersData = userData.orders.reverse();
        return res.json({status: "Success", data: ordersData,});
    } catch (error) {
        return res.status(500).json({message:"An error occurred"});
    }
});

//get-all-orders --Admin
router.get("/get-all-orders", authToken, async (req, res) => {
    try {
        const userData = await Order.find()
        .populate({
            path:"book",
        }).populate({
            path:"user",
        })
        .sort({createdAt: -1});
        return res.json({status: "Success", data: userData,});
    } catch (error) {
        return res.status(500).json({message:"An error occurred"});
    }
});

//update order --Admin
router.put("/update-status/:id", authToken, async (req, res) => {
    try {
        const {id} = req.params; //order id
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        return res.json({status: "Success", message:"Status Updated Successfully",});
    } catch (error) {
        return res.status(500).json({message:"An error occurred"});
    }
});

module.exports = router;