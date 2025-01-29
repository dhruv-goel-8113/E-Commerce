const port=4000;
const express=require("express");
const app=express();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cors=require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI,{
        connectTimeoutMS: 30000,  // 30 seconds
        socketTimeoutMS: 45000,   // 45 seconds
});

app.get("/",(req,res)=>{
    res.send("Express App is running");
})

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


//Schema for creating products
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },

})

// creating api for add product
app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    if(products.length > 0){
        let last_product_array=products.slice(-1); 
        let last_product=last_product_array[0];
        id=last_product.id + 1;
    }
    else{
        id=1;
    }

    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// creating api for remove product
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

// creating api for getting all products
app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("All products fetched");
    // res.json({
    //     products
    // })
    res.send(products);
})


// creating endpoint for latest products
app.get('/newcollection',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("Newcollection fetched");
    res.send(newcollection);
})

// creating endpoint for popular products
app.get('/popular',async(req,res)=>{
    let products=await Product.find({});
    let popularproduct=products.slice(0,4);
    console.log("Popular Products fetched");
    res.send(popularproduct);
})



//creating middleware to fetch user
const fetchUser=async(req,res,next)=>{
    const token=req.headers['auth-token'];
    if(!token){
        res.status(401).json({errors:"Please authenticate using valid login"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        } catch(error){
            res.status(401).json({errors:"Please authenticate using valid token"})
        }
    }
}

//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    let userData=await User.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId]+=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})

//creating endpoint for removing products in cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userData=await User.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId] > 0)
    {
        userData.cartData[req.body.itemId]-=1;
        await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    }
    res.send("Removed");
})

//Creating endpoint to get cart data
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log('Get cart');
    let userData=await User.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

// Schema user model
const User=mongoose.model('User',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    dateofbirth:{
        type:String,
    }
})

// creating endpoint for registering the user
app.post('/signup',async(req,res)=>{
    let check=await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"Existing user found with same email address"});
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new User({
        name:req.body.username,
        email:req.body.email,
        dateofbirth:req.body.dateofbirth,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
})

//creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user=await User.findOne({email:req.body.email});
    if(user){
        const passMatch=(req.body.password===user.password);
        if(passMatch){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"})
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Address"})
    }
})

app.post('/forgot',async(req,res)=>{
    let user=await User.findOne({email:req.body.email});
    if(user){
        const birthdateMatch=(req.body.dateofbirth===user.dateofbirth);
        if(birthdateMatch){
            res.json({success:true});
        }
        else{
            res.json({success:false,errors:"Wrong Dateofbirth"})
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Address"})
    }
})

app.post('/updatePassword',async(req,res)=>{
    await User.updateOne(
        { email: req.body.email },            // Query to find the user
        { $set: { password: req.body.password } } // Update the password field
      );
      res.json({success:true});
})
app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port " + port);
    }
    else{
        console.log("Error: " + error);
    }
})