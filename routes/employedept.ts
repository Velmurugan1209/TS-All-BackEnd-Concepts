import { Router } from "express";
import { empdept,UpdateEmpDept,DesEmpDept } from "../controller/employedeptcontroller";
export const EmpDeptRoute = Router();

EmpDeptRoute.post('/Empdeptpost',empdept)
EmpDeptRoute.put('/Empdeptput',UpdateEmpDept)
EmpDeptRoute.delete('/Empdeptdelete',DesEmpDept)