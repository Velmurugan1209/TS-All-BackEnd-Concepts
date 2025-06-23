import { connect, models } from "../db";
import { Sequelize,Model, DataTypes } from "sequelize";
import { empDeptDetailsDto } from "../../dto/employeinterface";
import { Employepersonaldetail } from "../db"

export class Employedeptmodel extends Model<empDeptDetailsDto> implements empDeptDetailsDto{
    
    id!: number;
    empid! : number ;
    empdept!: string;
    months!: string;
            
    static associate(models:any){
        this.belongsTo(models.Employepersonaldetail ,{
            foreignKey: "empid",
            as: "personal"
            
        })

        this.belongsToMany(models.Employesalarymodel,{
            foreignKey : "empid",
            as : "salary",
            through : "Many",
            otherKey : "id"
        })
    }   
}
export function initEmployedeptmodel(sequelize:Sequelize): typeof Employedeptmodel{
    Employedeptmodel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: false, 
            primaryKey:true,    
        },
        empid:{
            
            type : DataTypes.INTEGER,
            references:{
                model:"Employepersonaldetail",
                key:"empid"
            }
        },
        empdept: {
            type: DataTypes.STRING
        },
        months: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize: connect,
        modelName: "Employedeptmodel",
        tableName: "Employedept",
        freezeTableName: true,
        timestamps: false,
    })
       return Employedeptmodel ;
}