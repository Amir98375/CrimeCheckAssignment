// const { application } = require("express")
const express=require("express")
const mongoose=require("mongoose")
const { body, validationResult } = require('express-validator')
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
const connect=()=>mongoose.connect(
    "mongodb+srv://web15:web15@cluster0.zieim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
// schema to login operation
const crimeSchema=new mongoose.Schema({
    username:{type:String,required:true}
},
{
    timestamps:true,
    versionKey:false
}
)
// model for login operation
const Crime=new mongoose.model('crime',crimeSchema)
// crud operations for login to user with validation
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
//schema for post after loggin to post on notice board
//schema
const userNotice=new mongoose.Schema({
    notice:{type:String,required:true},
    username:{
        type:String,required:true
    }
},
{
    timestamps:true,
    versionKey:false
}
)

// notice model

const Message=new mongoose.model('userPost',userNotice)
//crud operations with validation 

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

// crud to get all the notices
app.get('/userPosts',async(req,res)=>{
    const userNotice=await Message.find().lean().exec()
    return res.status(201).send(userNotice)
})

// port to run the server
const port=process.env.PORT || 5100;
// connected with data base and server is runnning
app.listen(port,async()=>{
    try {
        await connect();
        console.log(`listening on port ${port}`)
    } catch (error) {
        console.log({message:error.message})
    }
})
