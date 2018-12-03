const express = require('express');
const router = express.Router();

var user = require('../models/user.js');

const APP = require('../../firebase_configuration.js');
const db = APP.registerApplication().database();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'user details fetched'
    })
});

router.post('/login/', (req, res, next) => {
    var ref = db.ref("chat/");
    AuthenticateUser(ref, req, res, next,  function (data) {
        if(data){
            console.log("if statement");
            res.status(200).json({
                phoneNumber: "",
                isValid: true,
                password: ""
            }).end();
            
        }
        else
        {
            if(!res.headersSent){
                console.log("else statement");
                res.status(401).json({
                    message: 'Invalid login credentials'
                }).end();
            }
        }

    });
});

// Function to validate user 
function AuthenticateUser(ref, req, res, next,callback) {
    console.log("in AuthenticateUser funcftion ");
    ref.once("value", function (snap) {
        snap.forEach(function (data) {
            console.log("phoneNumber: " + req.body.phoneNumber);
            console.log("password: " + req.body.password);

            if (data.key == req.body.phoneNumber && data.child("password").val() == req.body.password) {
                console.log(data.key);
                console.log(data.child("password").val());
               callback(true);
            }
        });
        callback(false);
    });
};

module.exports = router;