import { connect, models } from "../db";
import { empSalaryDetailsDto } from "../../dto/employeinterface";
import { Sequelize,Model, DataTypes } from "sequelize";

export class Employesalarymodel extends Model <empSalaryDetailsDto> implements empSalaryDetailsDto{
    id!: number;
    empid!: number;
    empsalary!: number;
    months!: string;

    static associate(models:any){
        this.belongsToMany(models.Employedeptmodel,{
            foreignKey : "id",
            as : "dept" , 
            through : "Many",
            otherKey : "empid"

        })
    }
}
export function initEmployesalarymodel (sequelize:Sequelize): typeof Employesalarymodel{
Employesalarymodel.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:false,
        
    },
    empid:{
        type : DataTypes.INTEGER,
        primaryKey : true
        
    },
    empsalary:{
        type:DataTypes.INTEGER,

    },
    months:{
        type:DataTypes.STRING,
    }
},{
    sequelize:connect,
    freezeTableName:true,
    timestamps:false,
    modelName:"Employesalarymodel",
    tableName:"Employesalary",
})
   return Employesalarymodel ;
}