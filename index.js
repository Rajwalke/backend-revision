const express=require('express');

const app=express();
app.use(express.json());
const {Pool}=require('pg');
const connectionpoll=new Pool({"connectionString":"postgresql://neondb_owner:npg_a5tSXmRosNY4@ep-sparkling-water-aunkkyvt-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"});

const data=[];

app.post("/signup",async(req,res)=>{
    const name=req.body.username;
    const email=req.body.email;
    const password=req.body.password;

    // const checkUserExist=data.find(user=>user.email===email);
    // const checkUserExist=connectionpoll.query("SELECT * FROM UserDataBackendRevison WHERE eamil=$1",[email]);
    // if(checkUserExist){
    //     res.status(403).json({
    //         message:"User alredy Exist!"
    //     });
    //     return;
    // }

    // const newUser = await connectionpoll.query(`INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id;`, [username, email, hashPassword]);
    const newUser=await connectionpoll.query(`INSERT INTO UserDataBackendRevison(username,email,password) VALUES ($1,$2,$3) RETURNING id;`,[name,email,password]);
   console.log("New User info",newUser);
    
    // data.push({
    //     name:name,
    //     email:email,
    //     password:password
    // });

    res.json({
        message:"User has been added"
    });
});

app.post("/signin",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const checkUserExist=data.find(user=>user.email===email && user.password===password);
    if(!checkUserExist){
        res.status(403).json({
            message:"Invalde credintals! Please Signup !"
        });
        return;
    }

    res.json({
        message:"User Login Scueesfully!"
    });

})

app.listen(4000);