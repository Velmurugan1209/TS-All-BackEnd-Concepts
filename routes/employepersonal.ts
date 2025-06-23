import { Router } from "express";
import {EmpPersnalList, LoginEmploye,emppersonal} from '../controller/employepersonalcontroller'


export const EmpPersonalRoute = Router();

EmpPersonalRoute.post('/EmpRegister' , emppersonal )
EmpPersonalRoute.post('/EmpLogin', LoginEmploye)
EmpPersonalRoute.get('/Emplist', EmpPersnalList)