import nodemailer, { createTransport } from 'nodemailer' ;
import express from 'express' ;
import { DataTypes, Sequelize } from 'sequelize' ;
import { ENUM } from 'sequelize' ;
import dotenv from 'dotenv'
dotenv.config();

const app = express() ;

app.use(express.json());

const sequelize = new Sequelize ("first" , "root" , "Velupvm1618@",{

    dialect  : "mysql",
    host : "localhost"

})

interface userDto {

 Type : TemplateType,
 Subject : string,
 Content : string,

}

enum TemplateType {

  BASIC = 'basic',
  STANDARD = 'standard',
  PRIMARY = 'primary',

}
interface reqmail {
    to:string,
    Type: TemplateType
}

const nodeuser = sequelize.define("nodeusers",{
    Type : {
        type: DataTypes.ENUM(...Object.values(TemplateType))
    },
    Subject:{
        type : DataTypes.STRING
    },
    Content :{
        type : DataTypes.STRING
    }  
})
sequelize.sync({alter:true})

app.post('/template', async (req,res)=>{

    try{
    const {Type,Subject,Content} : userDto = req.body ;
    const createtemplate  = await nodeuser.create({Type,Subject,Content})
    res.status(200).json("Template Is Created")
}
    catch(err:any){
        res.status(500).json(err.message)
    }

})

app.post('/gettemplate', async (req,res)=>{

    const {to,Type} : reqmail= req.body ;

    try{
        const responseusertemplate:userDto  = await nodeuser.findOne({where:{Type:Type}}) as any 
        console.log(responseusertemplate)
        if(!responseusertemplate){
            res.status(400).json({message:' Template not found'})
            return
        }
        if (responseusertemplate){
    const transport = createTransport({
        service : 'gmail',
        auth :{
            user : process.env.EMAIL,
            pass : process.env.EPASSWORD
        }

    })
   
    const sendmail = transport.sendMail({
    from :  process.env.EMAIL,
    to : to ,
    subject: responseusertemplate.Subject ,
    text : responseusertemplate.Content,
    // attachments : [
    //     {
    //         filename: 'SS.png',
    //         path : '../SS.png'
    //     }
    // ]
} , (err,info) => {
    if (err){
        console.log(err);
    }
    else{
        console.log(info);
    }
    res.status(200).json(responseusertemplate)
    })}}
    catch(err:any){
        res.status(500).json(err.message)
    }
})

app.listen(3000,()=>{

    console.log("Server is running") ;
    
})