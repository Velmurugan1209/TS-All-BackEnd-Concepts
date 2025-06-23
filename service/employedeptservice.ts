import {empDeptDetailsDto} from '../dto/employeinterface'
import {EmployeDeptDetailSchema} from '../validator/employeschema'
import { Employedeptmodel } from '../models/db';


export class Employedept {

    async getCreateEmpDept (requestempdept:empDeptDetailsDto):Promise<empDeptDetailsDto>{
        try{
            const {id,empdept,empid,months} : empDeptDetailsDto = requestempdept ;
            const returnempdept = await Employedeptmodel.create({id:id,empdept:empdept,empid:empid,months:months})

            if(!returnempdept){
                throw new Error("No Emp Dept Details Stored");
                
            }
            return returnempdept ;
        }
        catch(err:any){
            throw new Error(err.message);    
        }
    }

    async getupdateEmpDept (requestUpdateEmpDept:empDeptDetailsDto , reqUpdateEmpDeptEmpid :number):Promise<any>
{
    try{
        const {months} :empDeptDetailsDto = requestUpdateEmpDept ;
        const {empid} : any = reqUpdateEmpDeptEmpid  ;

        const returnUpdateEmpDept  = await Employedeptmodel.update({months:months},{where:{empid:empid}})

        if(!returnUpdateEmpDept){
            throw new Error("No Data Updated");
            
        }
        return returnUpdateEmpDept ;

    }
    catch(err:any){
        throw new Error(err.message);
        
    }
}
   async getDestroyEmpDept (reuqestDestroyEmpDept : number ):Promise<any>{
    try{
        const {empid} : any = reuqestDestroyEmpDept ;
        const returnDestroyEmpDept = await Employedeptmodel.destroy({where:{empid:empid}})
        if(!returnDestroyEmpDept){
            throw new Error("No Data Affected");   
        }
        return returnDestroyEmpDept ;
    }
    catch(err:any){
        throw new Error(err.message);
        
    }
   }


}
