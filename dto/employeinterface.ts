
export interface empLoginDto{
    id:number,
    email : string,
    Passwordd? : string
}
export interface empPersonDetailsDto{
    
    empid : number,
    name:string,
    age:number,
    email:string,
    address:string,
    id?:number,
    Passwordd? : string,
    
}
export interface empSalaryDetailsDto{

    id : number,
    empid : number,
    empsalary : number,
    months : string
}
export interface empDeptDetailsDto{
    id:number,
    empid : number,
    empdept:string,
    months:string
}