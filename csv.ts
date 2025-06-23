import {parse,format,writeToPath} from 'fast-csv'
import fs, { createReadStream } from 'fs';
import multer from 'multer';
import express from 'express';
import {DataTypes, Sequelize} from 'sequelize';
import path from 'path';
import { Response,Request } from 'express'; 
import { error, time } from 'console';

const app = express();

const sequelize = new Sequelize ("first",'root','Velupvm1618@',{
    dialect: 'mysql',
    host:'localhost'
})

interface csvDto{
    name:string,
    age:number,
    email:string
}

const csvtable = sequelize.define("csvtable",{
    name:DataTypes.STRING,
    age:DataTypes.INTEGER,
    email:DataTypes.STRING
},{
    timestamps:false,
    freezeTableName:true
})

sequelize.sync()

app.use('/import' , express.static('/import'))

const storage = multer.diskStorage({
    destination: path.join(__dirname , '/import'),

    filename: function(req,file,cb){
        cb( null , Date.now + "" + file.originalname)
    }
})

const upload = multer({storage:storage})

app.post('/upload', upload.single('csvfile'), async (req:Request,res:Response,):Promise<any>=>{
         
         const parsedata : any = [];
    try{
         const requestfile = req.file?.path ;
        const fileparse = createReadStream(requestfile! , "utf-8" )
        .pipe(parse({headers:true}))
        .on('data', (chunk)=>{ parsedata.push(chunk) ; })
        .on('end' , async ()=>{
            const CsvFileCreate : any = await csvtable.bulkCreate(parsedata)
            if (!CsvFileCreate){
              return  res.status(404).json("Files No Created")
                  }
           else{  
                 return res.status(200).json("CSV File has Created At DataBase")
            }
        } )
    }
      catch(err:any){
       return res.status(500).json(err.message)
          }}
)

app.get('/get' , async (req:Request,res:Response)=>{

    try{
        const getalldata  = await csvtable.findAll({raw:true})

        console.log(Date.now());
        
        
        
        // if(getalldata.length > 0){
        //     console.log("!!!!!!!!!!!!!!!!!!!!!!!!! Data Found ");
            
        // }
        
        const exportPath = path.join(__dirname, `./export/exports${Date.now() }.csv`)

        writeToPath(exportPath, getalldata ,{headers:true})

        .on('finish',()=>{
             res.status(200).json("CSV File Created Successfull")
        })
        .on('error',(err)=>{
            console.log(err.message);
            
        })

    }
    catch(err:any){
        res.status(500).json(err.message)
    }
} )

app.listen(3000, ()=>{
    console.log("Server Is Running");  
})

