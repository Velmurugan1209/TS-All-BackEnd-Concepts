import { EmployeSalaryDetailSchema } from "../validator/employeschema"; 
import { Request, Response } from "express";
import { Employesalaryservice } from "../service/employesalaryservice";

const employesalaryservice = new Employesalaryservice () ;

export const EmployeSalaryCreate = async (req:Request , res:Response)=>{
    try{
        const requestEmpSalaryCreate = EmployeSalaryDetailSchema.parse(req.body)

        const responseEmpSalaryCreate = await employesalaryservice.getEmployeSalaryCreate(requestEmpSalaryCreate)

        res.status(200).json("Employe Salary Is Created")
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
}

export const EmployeSalaryList = async (req:Request,res:Response)=>{
    try{
        
        const responseempsalarylist = await employesalaryservice.getEmployeSalaryList()
        res.status(200).json(responseempsalarylist)
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
}

export const UpdateEmployeSalary = async(req:Request,res:Response)=>{
    try{
        const requestUpdateEmpSalary = EmployeSalaryDetailSchema.parse(req.body)
        const requestParamsUpdateSalary : number = Number(req.params) ;
        const responseUpdateEmpSalary = await employesalaryservice.getUpdateEmpSalary(requestUpdateEmpSalary,requestParamsUpdateSalary)
        res.status(200).json("Emp Salary Has Updated")

    }
    catch(err:any){
        throw new Error(err.message);    
    }
}

export const DestroyEmpSalry = async (req:Request,res:Response)=>{
    try{
        const requestParamDestroySalary = Number(req.params)
        const responseDestroyEmpSalary = await employesalaryservice.getDestoryEmpSalary(requestParamDestroySalary)
        res.status(200).json("Emp Salary Row has Affected")
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
}

