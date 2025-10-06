const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Predefined 5 users with random passwords
const users = [
    { name: "Bharath S", username: "bharath", password: "Ab1#xy9Z" },
    { name: "Arunpandi V", username: "arunpandi", password: "Xy3$Lp2Q" },
    { name: "Akash", username: "akash", password: "Pa4#Tr7W" },
    { name: "Arun mari selvan", username: "arunmari", password: "Lm8$Qa5T" },
    { name: "Adil", username: "adil", password: "Qr2#Ui6P" },
];

// Insert users into DB (run once)
router.get("/setup", async (req, res)=>{
    await User.deleteMany({});
    await User.insertMany(users);
    res.send("Users added");
});

// Login route
router.post("/login", async (req,res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if(user) return res.json({ success: true, user });
    res.json({ success: false, message: "Invalid credentials" });
});

module.exports = router;
