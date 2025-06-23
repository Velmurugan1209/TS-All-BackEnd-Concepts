import {user} from '../models/user';
import {userDetailDto}  from '../dto/usersinterface';
import { Response,Request } from 'express';
import {connect} from '../models/db';
import { UserSchema } from '../validator/userschema';
import { UserService } from '../service/userservice';
const T = connect.transaction ();
const users = user; 
const userservice = new UserService();

export const usercreatedata   = async (req:Request,res:Response)=>{

    try{
        const requestuserdata :userDetailDto = UserSchema.parse(req.body);
        const responseusercreatedata : userDetailDto = await userservice.getUserCreateData(requestuserdata)
        res.status(200).json("The user data has Created")
    }
    catch(err:any){
        res.status(404).json("The Create methods has Bug" + err.message)
    }
}

export const userGetData = async (req:Request , res:Response)=>{

    try{
        const requestGetUserData:number  =  Number(req.params.empid) ;
        const responseUserGetData:userDetailDto = await userservice.getOneUserData(requestGetUserData)
        res.status(200).json(responseUserGetData)
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
}

export const userlistdata = async (req:Request, res:Response)=>{

    try{
        const responseuserlistdata : userDetailDto[] = await userservice.getUserListData();
        res.status(200).json(responseuserlistdata)
    }
    catch(err:any){
        res.status(500).json("Not Get your their is some bug "+ err.message)
    }
}

export const userupdatedata = async(req:Request, res:Response)=>{

    try{
         const requestUpdateData : userDetailDto = req.body ;
         const id = Number(req.params.empid)
         const responseuserupdatedata = await userservice.getUserUpdateData(requestUpdateData,id)
         res.status(200).json("User data is Updated")
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
}

export const userDestroyData = async (req:Request,res:Response)=>{
  try{
         const requestUserDestroyData  = Number(req.params.empid) ;
         const responseUserDestroyData  = await userservice.getUserDestroyData(requestUserDestroyData)
         res.status(200).json("User data is Destroyed" )
    }
    catch(err:any){
        res.status(500).json(err.message)
    }
}

