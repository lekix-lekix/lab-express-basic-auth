const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const isLoggedIn = require("../middlewares/route-guard");

router.get("/login", (req, res, next) => {
    try {
        res.render("login");
    } catch (error) {
        next(error);
    }
})

router.post("/login", async (req, res, next) => {
    try {
        console.log('SESSION =====> ', req.session);
        user = await User.find({ username: req.body.username });
        if (user.length === 1) {
            const match = await bcrypt.compare(req.body.password, user[0].password);
            if (match) {
                req.session.currentUser = user;
                console.log(user)
                res.render("success", { userInSession: user[0].username });
            } else {
                res.render('login', {
                    errorMessage: "Wrong password. Try again!"
                })
            }
        } else {
            res.render("login", {
                errorMessage: "No user found with these credentials, bitch. Sign up!"
            })
        }
    } catch (error) {
        next(error);
    }
})

router.get("/login/success", (req, res, next) => {
    try {
        res.render("success");
    } catch (error) {
        next(error);
    }
})

router.post('/logout', (req, res, next) => {
    try {
        req.session.destroy(err => {
            if (err) next(err);
            res.render('logout');
        });
    } catch (error) {
        next(error)
    }
})

router.get('/main', isLoggedIn, (req, res, next) => {
    try {
        console.log("coucou")
        res.render('main');
    } catch (error) {
        next(error);
    }
})

router.get('/private', isLoggedIn, (req, res, next) => {
    try {
        console.log("coucou")
        res.render('private');
    } catch (error) {
        next(error);
    }
})

module.exports = router;