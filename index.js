// const { application } = require("express")
const express=require("express")
const mongoose=require("mongoose")
const { body, validationResult } = require('express-validator')
const app=express()

app.use(express.json())
const connect=()=>mongoose.connect(
    "mongodb+srv://web15:web15@cluster0.zieim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )

const crimeSchema=new mongoose.Schema({
    username:{type:String,required:true}
},
{
    timestamps:true,
    versionKey:false
}
)
const Crime=new mongoose.model('crime',crimeSchema)

app.post('/crimes',
body('username').trim().not().isEmpty().withMessage("username should not be empty")
.isLength({min:8,max:20})
.withMessage("length should be more than 8 cahracters and max 20")
.custom((value)=>{
 const checkuser=/([a-z].*[0-9])|([0-9].*[a-z])/
 if(!value.match(checkuser)){
    throw new Error("user name must contain  alphanumeric")
 }
 return true
}),
async(req,res)=>{
//to check catch the erorrs
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

    const crime=await Crime.create(req.body)
    return res.status(201).send(crime)
})
//schema for post after loggin
const userNotice=new mongoose.Schema({
    notice:{type:String,required:true},
},
{
    timestamps:true,
    versionKey:false
}
)

const Message=new mongoose.model('userPost',userNotice)

app.post("/userPosts", body('notice').trim().not().isEmpty()
.withMessage("notice not should be empty")
.isLength({min:10,max:100})
.withMessage("notice should be min of 10 and max of 100"),

   async(req,res)=>{
  // to catch the erorrs in validation
  const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
   const userNotice=await Message.create(req.body)
   return res.status(201).send(userNotice)
})

// crud to get the data
app.get('/userPosts',async(req,res)=>{
    const userNotice=await Message.find().lean().exec()
    return res.status(201).send(userNotice)
})

app.listen(5000,()=>{
    try {
        connect()
        console.log("listening on port 5000")
    } catch (error) {
        console.log("not connected")
    }

})