import {empDeptDetailsDto} from '../dto/employeinterface'
import {EmployeDeptDetailSchema} from '../validator/employeschema'
import { Employedept } from '../service/employedeptservice'
import { Response,Request } from 'express';
import { Param } from '@prisma/client/runtime/library';

const employedept = new Employedept();

export const empdept = async (req:Request,res:Response)=>{
    try{
        const requestempdept = EmployeDeptDetailSchema.parse(req.body)
        const responseempdept = await employedept.getCreateEmpDept(requestempdept)
        res.status(200).json("Employe Dept details Stored")
    }
    catch(err:any){
          res.status(500).json(err.message)
    }
}

export const UpdateEmpDept = async (req:Request , res:Response)=>{
    try{
        const requestUpdateEmpDept = EmployeDeptDetailSchema.parse(req.body)
        const reqUpdateEmpDeptEmpid = Number(req.params) ;
        const responseUpdateEmpDept = await employedept.getupdateEmpDept(requestUpdateEmpDept ,reqUpdateEmpDeptEmpid )
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
}

export const DesEmpDept = async (req:Request,res:Response)=>{
    try{
        const reuqestDestroyEmpDept = Number(req.params);
        const responseDestroyEmpDept = await employedept.getDestroyEmpDept(reuqestDestroyEmpDept)
        res.status(200).json("Emp Data Destroy ")
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
}

