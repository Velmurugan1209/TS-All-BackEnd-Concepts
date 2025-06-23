import {Employepersonal} from '../service/employepersonalservice'
import {EmployeLoginSchema, EmployePersonalDetailSchema} from '../validator/employeschema'
import {empPersonDetailsDto} from '../dto/employeinterface'
import { Request,Response } from 'express';

const employepersonal = new Employepersonal();


export const emppersonal = async (req:Request,res:Response)=>{

    try{
        const requestemppersonal  = EmployePersonalDetailSchema.parse(req.body);
        const responseemppersonal: empPersonDetailsDto = await employepersonal.getCreateEmployePersonal(requestemppersonal)
        res.status(200).json("Registed Successfully")
        console.log(responseemppersonal);
        
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
}

export const LoginEmploye = async(req:Request,res:Response)=>{

    try{
        const requestEmployeLogin  = EmployeLoginSchema.parse(req.body) ;
        const responseLoginEmploye = await employepersonal.getEmployeLogin(requestEmployeLogin)
        res.status(200).json("Login Successfull And Check Your Mail Id")
    }
    catch(err:any){
        res.status(500).json(err.message)
        console.error(err.message);
        
    }}
    
export const EmpPersnalList = async (req:Request,res:Response)=>{
        try{
            const responseEmpList = await employepersonal.getEmpPersonal()
            res.status(200).json(responseEmpList)
        }
        catch(err:any){
            res.status(500).json(err.message)
        }
    }




