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


//api for sign up
router.post('/', (req, res, next) => {
    let ref = db.ref("chat/");

    UserExist(ref, req, res, next,  function (data) {
        if(!data){
            let newRef = db.ref("chat/" + req.body.phoneNumber + "/");
            CreateUser(newRef, req, res, next,  function (data) {
                res.status(200).json({
                    message: 'User created successfully',
                    isUserExist: false
                }).end();
            });
        }
        else
        {
            res.status(409).json({
                message: 'User already exist!',
                isUserExist: true
            }).end();
        }

    });

});


router.post('/login/', (req, res, next) => {
    var ref = db.ref("chat/");
    AuthenticateUser(ref, req, res, next,  function (data) {
        if(data){
            res.status(200).json({
                phoneNumber: "",
                isValid: true,
                password: ""
            }).end();
            
        }
        else
        {
            if(!res.headersSent){
                res.status(401).json({
                    message: 'Invalid login credentials'
                }).end();
            }
        }

    });
});

// Function to validate user 
function AuthenticateUser(ref, req, res, next,callback) {
    ref.once("value", function (snap) {
        snap.forEach(function (data) {
            if (data.key == req.body.phoneNumber && data.child("password").val() == req.body.password) {
               callback(true);
            }
        });
        callback(false);
    });
};

// Function to check for existing user 
function UserExist(ref, req, res, next,callback) {
    let isUserExist = false;
    ref.once("value", function (snap) {
       
        snap.forEach(function (number) {
            if (number.key == req.body.phoneNumber) {
                isUserExist = true;
            }
        });
    }).then(function(){
        callback(isUserExist);
     });
};

// Function to create user 
function CreateUser(ref, req, res, next,callback) {
   ref.set({
        name: req.body.firstName,
        password: req.body.password
    }).then( function(){
        callback(true);
    });
};

module.exports = router;