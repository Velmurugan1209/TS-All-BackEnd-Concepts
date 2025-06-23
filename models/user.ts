import { Model,DataTypes, Sequelize } from "sequelize";
import {connect} from "./db";
import { userDetailDto } from "../dto/usersinterface";
//import { DataTypes } from '../node_modules/sequelize/types/index';
//const sequelize = new Sequelize('sqlite::memory:');

 export class user extends Model<userDetailDto> implements userDetailDto {
    name!: string;
    age!: number;
    tech!: string;
    empid!: number;
} 
user.init({
    
    name:{
        type : DataTypes.STRING,
       
    },
    age : {
        type : DataTypes.INTEGER,
          
        },
    tech : {
            type : DataTypes.STRING,
            
        },
     empid :{
            type : DataTypes.INTEGER,
            
        }

    },{
        sequelize : connect ,
        modelName : "user" ,
        tableName : "table1" ,
        timestamps : false ,
        freezeTableName : true

    }
      
)   





    





