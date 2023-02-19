const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.get("/signup", (req, res, next) => {
    try {
        res.render("signup");
    } catch (error) {
        next(error);
    }
});

router.post("/signup", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (req.body.username.length === 0 || req.body.password.length === 0) {
            return res.render('signup', {
                errorMessage: 'Fill out all the fields, bitch!',
            })
        }
        const findUser = await User.findOne({username: req.body.username})
        if (findUser) {
            return res.render('signup', {
                errorMessage: 'You already have an account bitch! Log in!',
            })
        };
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(req.body.password, salt);
        req.body.password = passHash;
        const newUser = User.create(req.body);
        res.redirect("login");
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;