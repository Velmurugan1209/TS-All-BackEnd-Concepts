import  {  Sequelize } from'sequelize' ;
import dotenv from 'dotenv' ; 
import { Employedeptmodel, initEmployedeptmodel  } from './employe/empdeptdetails'
import { Employesalarymodel, initEmployesalarymodel } from "../models/employe/empsalarydetails"
import { Employepersonaldetail, initEmployepersonaldetail } from "../models/employe/emppersonaldetail"
dotenv.config();

 export const connect = new Sequelize(process.env.DBDATABASE as string ,process.env.DBUSERNAME as string,process.env.DBPASSWORD as string,{
    host : 'localhost',
    dialect : 'mysql' ,
});

(async()=>{

  try{
    await connect.sync();
    console.log("your database",process.env.DBDATABASE , "created")
  }
  catch(err:any){
    console.log("My Error " + err.message);
    
  }
})();

export const models = {

  Employepersonaldetail:initEmployepersonaldetail(connect),
  Employesalarymodel:initEmployesalarymodel(connect),
  Employedeptmodel:initEmployedeptmodel(connect),
}


Object.values(models).forEach((model:any) => {
  if(model.associate){
    model.associate(models)
  }
  
});


export{ Employepersonaldetail,Employesalarymodel, Employedeptmodel }









  
  



 

 


  

   
 


