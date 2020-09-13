const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const user = require("../model/user");
const router = express.Router();
router.post("signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10).then(hash => {

        const user = new User({
            email:req.body.email,
            password:hash
        });
        user.save().then(savedUser=>{
            res.status(201).json({
                message:'user created successfully',
                result:savedUser
            })
        }).catch(err=>{
            res.status(500).json({
                error:err
            });
        })

    });
   
});

router.post("/login",(req,res,next)=>{
    User.find({email:req.body.email})
    .then(user =>{
        if(!user){
            return res.status(400).json({
                message:'Authenticatio failed'
            });
        }
        return bcrypt.compare(req.body.password,user.password);
    }).then(result=>{
        if(!result){
            return res.status(400).json({
                message:'Authenticatio failed'
            });
        }
       const token =  jwt.sign({email:user.email,userId:user._id},
        'secret',
        {expiresIn:'1h'});
        res.status(201).json({
            token:token
        });
    }).catch(err=>{
        return res.status(400).json({
            message:'Authenticatio failed'
        });
    })
});

module.exports = router;
