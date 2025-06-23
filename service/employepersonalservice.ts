import { Employedeptmodel, Employepersonaldetail } from "../models/db";
import { empPersonDetailsDto, empLoginDto } from "../dto/employeinterface";
import jwt, { verify } from "jsonwebtoken";
import nodemailer from 'nodemailer';
const SecretKey = process.env.KEY;
import cron from 'node-cron';
import bcrypt from 'bcrypt';
import { boolean } from "zod";

export class Employepersonal {
  async getCreateEmployePersonal(
    requestemppersonal: empPersonDetailsDto
  ): Promise<empPersonDetailsDto> {
    try {
      const {
        empid,
        name,
        age,
        email,
        address,
        Passwordd,
      }: empPersonDetailsDto = requestemppersonal;
      const safe : string = await bcrypt.hash(Passwordd! , 10)
      const returnCreateEmployePersonal = await Employepersonaldetail.create({
        empid,
        name,
        age,
        email,
        address,
        Passwordd:safe,
      });

      const decode = bcrypt.compare(requestemppersonal.Passwordd! , safe)
     if (decode){
      console.log("this is "+decode);}
      else{
        console.log("No Decode a Password");
        
      }
      
      
      if (!returnCreateEmployePersonal) {
        throw new Error("No Create Employe personal Details");
      }

      return returnCreateEmployePersonal;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getEmployeLogin(requestEmployeLogin: any): Promise<any> {

    
  
    try {
      const {id, email,Passwordd}:empLoginDto = requestEmployeLogin;
      const returnEmployeLogin:  any =
        await Employepersonaldetail.findOne({
          where: { id:id,email: email },
        });

      if (!returnEmployeLogin) {
        throw new Error("No Login User Found");
      }
        const verify = await bcrypt.compare(Passwordd!, returnEmployeLogin.Passwordd);

        if(verify){ 
             
           console.log(verify)

        if (  email === returnEmployeLogin.email  ) {

          const token = jwt.sign({email:returnEmployeLogin.email}, SecretKey!,{expiresIn:'1h'});
          if (token) {

            const transport = nodemailer.createTransport({

                service : 'gmail',
                auth : {
                    user: process.env.EMAIL,
                    pass : process.env.EPASSWORD
                }
            })
            cron.schedule('* * * * *',()=>{
            const sendmail = transport.sendMail({
                from : process.env.EMAIL,
                to : email ,
                subject : "Login Successfull Collect Your Token",
                text : token 
            },(err,info)=>{
                if(err){ console.log(err.message); }
                else{ console.log(info); }
            })
            })
            } else {  console.log("No Token Generated");}
        }
       return returnEmployeLogin;
      }
      
      else{
        throw new Error( "Username and Password invalid");  
      } }
      
      catch (err: any) {
        throw new Error("Username And Password Invalid");
      } 
  }

  async getEmpPersonal ():Promise<empPersonDetailsDto[]>{

    try{
        
        const returnlistEmppersonal :empPersonDetailsDto[]  = await Employepersonaldetail.findAll({include:[{model:Employedeptmodel,as:'dept'}]})
        if(!returnlistEmppersonal){
            throw new Error("No Data Found");       
        }
        return returnlistEmppersonal ;
    }
    catch(err:any){
        throw new Error(err.message);
        
    }
  }
}
