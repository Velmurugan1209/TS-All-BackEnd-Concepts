import { DataTypes, Sequelize, where } from "sequelize";
import express from "express";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt" ;
const app = express();
app.use(express.json());

const sequelize = new Sequelize("first", "root", "Velupvm1618@", {
  dialect: "mysql",
  host: "localhost",
});

const UserLogin = sequelize.define("UserLogin", {
  email: {
    type: DataTypes.STRING,
  },
  Password: {
    type: DataTypes.STRING,
  },
});

sequelize.sync({ alter: true });
const T = sequelize.transaction();

interface loginDto {
  email: string;
  Password: string;
}

app.post("/register", async (req:Request,res:Response) => {
  try {
    const { email, Password }: loginDto = req.body;

    const checkuseremail = await UserLogin.findOne({ where: { email: email } });

    if (!checkuseremail) {
      
      const responseUserLogin  = await UserLogin.create({ email:email, Password:Password }) as any ;
      
      if (!responseUserLogin.email || !responseUserLogin.Password) {
        res.status(400).json({message:"No Registered"});
        return ;
      }
      res.status(200).json({ mesaage:"User Has Registered"});
    
    }
    else{
        res.status(500).json({message:"User Is Already Exists"});  
    }
  } catch (err: any) {

    throw new Error(err.message);
  }
});

app.post('/login', async (req,res)=>{
    try{
        const {email,Password}:loginDto = req.body
        const responselogin:any = await UserLogin.findOne({where:{email:email,Password:Password}})
        if(!responselogin){
            res.status(400).json("No Login Data Found")
        }
        
       // console.log(responselogin);
        
        if(email===responselogin.email && Password===responselogin.Password){

            const token = jwt.sign(responselogin.email,"abcd")

            res.status(200).json("Login Successfull"+ " Your Tokens Is " + token)
        }
        else{
            res.status(500).json("Incorrect Username & Password Login Failed")
        }
        
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
})

app.post ('/token',(req:Request,res:Response) => {
    try{
        const requesttoken =  req.headers['authorization'];
        const token:any = requesttoken?.split(' ')[1]
        const verifytoken = jwt.verify(token,"abcd")
        res.status(200).json(verifytoken + "   Token Verify Is Success")
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
    
})

app.listen(3000, () => {
  console.log("server is running");
});
