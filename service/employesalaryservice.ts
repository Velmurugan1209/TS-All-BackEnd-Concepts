
import { Employedeptmodel, Employesalarymodel } from "../models/db";
import { empSalaryDetailsDto } from "../dto/employeinterface";

export class Employesalaryservice {

    async getEmployeSalaryCreate (requestEmpSalaryCreate : empSalaryDetailsDto):Promise<empSalaryDetailsDto>{

        try{
            const {id,empid,empsalary,months}  = requestEmpSalaryCreate ;
            const returnEmpSalaryCreate : empSalaryDetailsDto = await Employesalarymodel.create({id,empid,empsalary,months})

            if(!returnEmpSalaryCreate){
                throw new Error("No Create Emp Salary Details ");   
            }
        return returnEmpSalaryCreate ;
        
        }
       catch(err:any){
        throw new Error(err.message);
          }
    }

    async getEmployeSalaryList():Promise<any>{

        try{
            const returnEmpSalaryList : empSalaryDetailsDto[] = await Employesalarymodel.findAll({include:{model:Employedeptmodel,as:"dept"}})

          if(!returnEmpSalaryList){
            throw new Error("No Found EmpSalary Details");  
          }
          return returnEmpSalaryList ; 
        }
        catch(err:any){
            throw new Error(err.message);
            
        }
    }
    async getUpdateEmpSalary (requestUpdateEmpSalary:empSalaryDetailsDto , requestParamsUpdateSalary : number):Promise<empSalaryDetailsDto>{
        try{
            const {empsalary,months} : empSalaryDetailsDto = requestUpdateEmpSalary ;
           const {empid} : any =  requestParamsUpdateSalary ;
            const returnUpdateEmpSalary  = await Employesalarymodel.update({empsalary,months},{where:{empid:empid}})
            
            if(!returnUpdateEmpSalary){
                throw new Error("No Update Emp Salary Details");
                 }
           return requestUpdateEmpSalary ;
        }
        catch(err:any){
            throw new Error(err.message);    
        }   
    }

    async getDestoryEmpSalary (requestParamDestroySalary : number):Promise<any>{
        try{

            const {empid} : any = requestParamDestroySalary ;
            const returnDestroyEmpSalary = await Employesalarymodel.destroy({where:{empid:empid}})
            if(!returnDestroyEmpSalary){
                throw new Error("No Rows Affected");
            }
            return returnDestroyEmpSalary ;
        }
        catch(err:any){
            throw new Error(err.message);
            
        }
    }
}