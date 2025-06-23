
import {user} from '../models/user';
import {userDetailDto}  from '../dto/usersinterface';

export class UserService {
 
async getUserCreateData(requestUserCreateData: userDetailDto):Promise<userDetailDto>{
  try{

const {name,age,tech,empid} = requestUserCreateData as userDetailDto ;

const returnUserData:userDetailDto = await user.create({name,age,tech,empid})

if (!returnUserData){
  throw new Error("No return User Create data");  
}
return returnUserData ;}

catch(err:any){
  throw new Error(err.messag);
 
}
}

async getOneUserData (requestGetUserData:number):Promise<userDetailDto>{

try{
  const returnOneUserData : userDetailDto | null = await user.findOne({where:{empid:requestGetUserData}});

  if (!returnOneUserData){
    throw new Error("No return UsergetOne Data");
    
  }
  return returnOneUserData ;}

  catch(err:any){
    throw new Error(err.messag);
  }

}

async getUserListData():Promise<userDetailDto[]>{
    try{

  const returnUserListData : userDetailDto[] = await user.findAll();

  if (!returnUserListData){
    throw new Error("No List User Data");
  }
  return returnUserListData ;}

  catch(err:any){
    throw new Error(err.messag);
    
  }
}

async getUserUpdateData(requestUserUpdateData: userDetailDto,id:number){

  try{
    
  const {name,age,tech,empid} = requestUserUpdateData as userDetailDto ;
  
  const returnUserUpdateData :number[]  = await user.update({name,age,tech,empid},{where:{empid:empid}})

  if(!returnUserUpdateData){
    throw new Error("No returnUpdatedata");
  }
  return returnUserUpdateData ; }

  catch(err:any){
    throw new Error(err.messag);
    
  }
}

async getUserDestroyData(requestUserDestroyData: number){

  try{
  //const {empid} = requestUserDestroyData as userDetailDto ;
  
  const returnUserDestroyData :number  = await user.destroy({where:{name:requestUserDestroyData}})

  if(!returnUserDestroyData){
    throw new Error("No DestroyUserData");
  }
  return returnUserDestroyData ;   }
  catch(err:any){
    throw new Error(err.messag);
    
  }     
}

}
