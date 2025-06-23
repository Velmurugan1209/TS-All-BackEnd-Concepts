import { Sequelize,Model, DataTypes } from "sequelize";
import { connect, Employedeptmodel,models } from "../db";
import { empPersonDetailsDto } from "../../dto/employeinterface";
 
 export class Employepersonaldetail extends Model <empPersonDetailsDto> implements empPersonDetailsDto{
    id!: number;
    empid! : number;
    Passwordd!: string;
    name!: string;
    age!: number;
    email!: string;
    address!: string;
    

    static associate(models:any){
        this.hasOne(models.Employedeptmodel,
            {
            foreignKey : "empid",
            as : "dept" ,
        })
        
    }
     
    

    
}


export function initEmployepersonaldetail (connect:Sequelize): typeof Employepersonaldetail{
Employepersonaldetail.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        unique : true
    },
    empid:{
        type:DataTypes.INTEGER,
        primaryKey : true
    },
    name:{
        type:DataTypes.STRING,
    },
    age:{
        type:DataTypes.INTEGER,
    },
    email:{
        type:DataTypes.STRING,

    },
    address:{
        type:DataTypes.STRING,
    },
    
    Passwordd:{
        type:DataTypes.STRING
    },
    
},{
    sequelize:connect,
    freezeTableName:true,
    modelName:"Employepersonaldetail",
    tableName : "Employepersonaldetail",
    timestamps:false,

})
    return Employepersonaldetail ;
}