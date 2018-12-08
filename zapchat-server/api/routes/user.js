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
            //console.log("if statement");
            let newRef = db.ref("chat/" + req.body.phoneNumber + "/");
            CreateUser(newRef, req, res, next,  function (data) {
                res.status(200).json({
                    message: 'User created successfully',
                    isValid: true
                }).end();
            });
        }
        else
        {
                //console.log("else statement");
                res.status(409).json({
                    message: 'User already exist!'
                }).end();
        }

    });

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
                //console.log("else statement");
                res.status(401).json({
                    message: 'Invalid login credentials'
                }).end();
            }
        }

    });
});

// Function to validate user 
function AuthenticateUser(ref, req, res, next,callback) {
    //console.log("in AuthenticateUser funcftion ");
    ref.once("value", function (snap) {
        snap.forEach(function (data) {
            //console.log("phoneNumber: " + req.body.phoneNumber);
            //console.log("password: " + req.body.password);

            if (data.key == req.body.phoneNumber && data.child("password").val() == req.body.password) {
                //console.log(data.key);
                //console.log(data.child("password").val());
               callback(true);
            }
        });
        callback(false);
    });
};

// Function to check for existing user 
function UserExist(ref, req, res, next,callback) {
    //console.log("in user exist function ");
    let isUserExist = false;
    ref.once("value", function (snap) {
       
        snap.forEach(function (number) {
            //console.log("Entered phoneNumber: " + req.body.phoneNumber);
            if (number.key == req.body.phoneNumber) {
                //console.log("PhoneNumber in Firebase: " + number.key);
                isUserExist = true;
            }
        });
    }).then(function(){
        callback(isUserExist);
     });
};

// Function to create user 
function CreateUser(ref, req, res, next,callback) {
    //console.log("in create user function ");
   ref.set({
        name: req.body.name,
        password: req.body.password
    }).then( function(){
        callback(true);
    });
};

module.exports = router;