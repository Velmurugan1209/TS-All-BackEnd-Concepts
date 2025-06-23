import multer  from 'multer';
import express from 'express';
import csv from 'csv-parser';
import { DataTypes, Sequelize } from 'sequelize' ;

const app = express() ;

const sequelize = new Sequelize('first','root','Velupvm1618@',{
   dialect : 'mysql' ,
   host : 'localhost'
})
enum Template{
    Basic = "basic" ,
    Secondary = "secondary" ,
    Primary = "primary"
}
interface htmlDto{
    Type : Template ,
    Subject : string ,
    Text : String
}
const html = sequelize.define( "html" , {

    Type: DataTypes.ENUM(...Object.values(Template)) ,

    Subject : DataTypes.STRING ,

    Text : DataTypes.STRING ,
    
},{freezeTableName:true ,
    timestamps : false
})
sequelize.sync({force:true});


