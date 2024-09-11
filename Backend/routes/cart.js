const router = require("express").Router();
const User = require("../models/user");
const {authToken} = require("./userAuth");

//add book to cart
router.put("/add-to-cart", authToken, async(req, res) =>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if(isBookInCart)
        {
            return res.json({status: "Success", message: "Book is already in cart"});
        }
        await User.findByIdAndUpdate(id, {$push:{cart:bookid}});
        return res.json({status: "Success", message: "Book added to Cart"});
    } catch (error) {
        res.status(500).json({message:"An error occurred"});
    }
});

//remove book from cart
router.put("/remove-from-cart/:bookid", authToken, async(req, res) =>{
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        const userData = await User.findById(id);
        await User.findByIdAndUpdate(id, {$pull: {cart:bookid}});
        return res.status(200).json({message: "Book removed from Cart"});
    } catch (error) {
        res.status(500).json({message:"An error occurred"});
    }
});

//get cart of a perticular user
router.get("/get-user-cart", authToken, async(req, res) =>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({status: "Success", data: cart});
    } catch (error) {
        res.status(500).json({message:"An error occurred"});
    }
});


module.exports = router;