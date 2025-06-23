import {z} from 'zod'

export const EmployeLoginSchema= z.object({
    id : z.number(),
    Passwordd : z.string(),
    email:z.string()
})
export const EmployePersonalDetailSchema = z.object({
    empid : z.number(),
    name: z.string(),
    age: z.number(),
    email: z.string(),
    address : z.string(),
   // id : z.number(),
    Passwordd : z.string()
})
export const EmployeSalaryDetailSchema = z.object({
    id : z.number({required_error:"Enter Your EmpId"}),
    empid: z.number(),
    empsalary : z.number({required_error:"Enter Your Salary"}),
    months : z.string().nonempty()
})

export const EmployeDeptDetailSchema = z.object({
    id : z.number(),
    empid: z.number(),
    empdept : z.string().nonempty(),
    months : z.string().nonempty()
})