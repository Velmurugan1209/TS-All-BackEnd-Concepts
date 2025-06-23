import { Router } from "express";
import { EmployeSalaryList,UpdateEmployeSalary,DestroyEmpSalry,EmployeSalaryCreate } from "../controller/employesalarycontroller";

export const EmpSalaryRoute = Router();

EmpSalaryRoute.post('/EmpSalaryCreate', EmployeSalaryCreate)
EmpSalaryRoute.get('/EmpSalaryList', EmployeSalaryList)
EmpSalaryRoute.put('/EmpSalaryUpdate' , UpdateEmployeSalary)
EmpSalaryRoute.delete('/EMpSalaryDelete',DestroyEmpSalry)