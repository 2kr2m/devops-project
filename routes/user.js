
const express =require('express');
const router = express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/getall',(req,res)=>{
    User.find()
        .then((userlist)=>{
            res.send(userlist);
        })
        .catch((err)=>{
            res.send(err);
        })
})
//get all with async await
router.get('/all',async(req,res)=>{
    try {
        userslist=await User.find().where('age').gt(23).lt(50);
        res.send(userslist);
    } catch (error) {
        res.send(error);
    }
})

//get by id 
router.get('/getoneuser/:id',(req,res)=>{
    myid=req.params.id;
    User.findOne({_id:myid})
        .then((user)=>{
            res.send(user);
        })
        .catch((err)=>{
            res.send(err);
        })
})
//get by id with(findbyid)
router.get('/getuser/:id',(req,res)=>{
    myid=req.params.id;
    User.findById(myid)
        .then((user)=>{
            res.send(user);
        })
        .catch((err)=>{
            res.send(err);
        })
})
router.get('/getuserbyid/:id',async(req,res)=>{
    try {
        myid=req.params.id;
        user=await User.findById(myid);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})
router.post('/register',async(req,res)=>{
    data=req.body;
    usr=new User(data);
    salt=bcrypt.genSaltSync(10);
    cryptedpass=await bcrypt.hashSync(data.password,salt);
    usr.password=cryptedpass;
    usr.save()
        .then((result)=>{
            	res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
})

router.post('/login',async(req,res)=>{
    data=req.body;
    usr=await User.findOne({"email":data.email});
    if (!usr) {
        res.status(404).send('email or password not found');
    }
    else{
        passcomp=await bcrypt.compareSync(data.password,usr.password);
        if (!passcomp) {
            res.status(401).send('email or password not found');
        } else {
            payload={
                _id:usr._id,
                name:usr.name,
                email:usr.email
            }
            token=jwt.sign(payload,'12345678');
            res.status(200).send({mytoken:token});
        }
    }
})
router.put('/update/:id',async (req,res)=>{
   
    try {
        id=req.params.id;
        newdata=req.body;
        updated=await User.findByIdAndUpdate(id,newdata);
        res.send(updated);
    } catch (error) {
        res.send(error);
    }
})

router.delete('/delete/:id',async(req,res)=>{
  
    try {
        delid=req.params.id;
        deluser= await User.findByIdAndDelete(delid);
        res.send(deluser);      
    } catch (error) {
        res.send(error);
    }
})


module.exports=router;