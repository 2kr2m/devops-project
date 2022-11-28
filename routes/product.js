const express =require('express');
const router = express.Router();
const Product=require('../models/product')

const multer = require('multer');
filename='';
const filestorage =multer.diskStorage({
    destination : './uploads',
    filename:(req,file,redirect)=>{
        let date =Date.now();
        let fl = date+'.'+file.mimetype.split('/')[1];
        redirect(null,fl);
        filename=fl;
    }
})



// PRODUCT CRUD
router.get('/allproduct',async(req,res)=>{
    try {
        productslist=await Product.find();
        res.send(productslist);
    } catch (error) {
        res.send(error);
    }
})

router.get('/getproductbyid/:id',async(req,res)=>{
    try {
        myid=req.params.id;
        prod=await Product.findById(myid);
        res.send(prod);
    } catch (error) {
        res.send(error);
    }
})

const upload=multer({storage:filestorage});

router.post('/create',upload.any('image'),(req,res)=>{
    
        data = req.body;
        prod = new Product(data);
        prod.save()
        .then((saved)=>{
            res.send(saved);
        })
        .catch ((error)=>{
        res.send(error);
        });
})

router.post('/addproduct',upload.any('image'),async(req,res)=>{
    try {
        data = req.body;
        prod = new Product(data);
        savedprod = await prod.save();
        res.send(savedprod);
    } catch (error) {
        res.send(error);
    }
})

router.put('/updateproduct/:id',async (req,res)=>{
   
    try {
        id=req.params.id;
        newdata=req.body;
        updated=await Product.findByIdAndUpdate(id,newdata);
        res.send(updated);
    } catch (error) {
        res.send(error);
    }
})

router.delete('/deleteproduct/:id',async(req,res)=>{
  
    try {
        delid=req.params.id;
        delprod= await Product.findByIdAndDelete(delid);
        res.send(delprod);      
    } catch (error) {
        res.send(error);
    }
})
module.exports = router;