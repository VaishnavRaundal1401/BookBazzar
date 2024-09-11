const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authToken} = require("./userAuth");
//Sign up
router.post("/sign-up", async(req, res) => {
    try {
        const {username ,email, password, address} = req.body;

        //check username length is more than 4
        if(username.length < 4)
        {
            return res.status(400).json({message: "username length should be more than 3"});
        }
        //check username already exists ?
        const existingUsername = await User.findOne({username: username});
        if(existingUsername)
        {
            return res.status(400).json({message: "username already exists"});
        }
        //check email already exists ?
        const existingEmail = await User.findOne({email: email});
        if(existingEmail)
        {
            return res.status(400).json({message: "email already exists"});
        }
        //check password length
        if(password.length <=5)
        {
            return res.status(400).json({message: "password length should be more than 5"});
        }
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username:username,
            email:email,
            password:hashPass,
            address:address,
        });
        await newUser.save();
        return res.status(200).json({message: "Signup Successfully"});

    } catch (error) {
       res.status(500).json({message:"Internal Server error"}) ;
    }
})

//Sign In
router.post("/sign-in", async(req, res) => {
    try {
        const {username, password} = req.body; // user ne abhi bhara hai
        const existingUser = await User.findOne({username});
        if(!existingUser)
        {
            res.status(400).json({message:"Invalid Credentials"}) ;
        }

        await bcrypt.compare(password, existingUser.password, (err, data) => {// existingUser.password jo ki pahle se hai
            if(data)
            {
                const authClaims = [
                    {name:existingUser.username},
                    {role:existingUser.role},
                ]
                const token = jwt.sign({authClaims}, "bookStore789", {expiresIn:"30d"})
                res.status(200).json({id: existingUser._id, role:existingUser.role, token:token});
            }
            else{
                res.status(400).json({message:"Invalid Credentials"});
            }
        });
    } catch (error) {
       res.status(500).json({message:"Internal Server error"});
    }
})

//get user information
router.get("/get-user-info", authToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"Internal Server error"});
    }
})

//update address
router.put("/update-address", authToken, async (req, res) =>{
    try {
        const { id } = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address:address});
        return res.status(200).json({message:"Address Updated Successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server error"});
    }
} )
module.exports = router;
