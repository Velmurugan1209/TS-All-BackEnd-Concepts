import express from 'express' ;
import dotenv from 'dotenv';
import {UserRouter} from './routes/userroute'; 
import {EmpPersonalRoute} from './routes/employepersonal'
import { connect } from './models/db';
import {EmpDeptRoute} from './routes/employedept'
import{EmpSalaryRoute} from './routes/employesalary'
const app = express();
dotenv.config();
const portno  = process.env.PORT 

app.use(express.json());

app.use('/EmpPersonal',EmpPersonalRoute )
app.use('/User', UserRouter);
app.use('/EmpDept',EmpDeptRoute)
app.use('/EmpSalary',EmpSalaryRoute)


app.listen(portno , ()=>{
    console.log("server is running");    
})











 