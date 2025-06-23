const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const {Sequelize, DataTypes} = require('sequelize') ;
const path = require('path') ;

// Initialize Express and Sequelize

const app = express();
const port = 3000;

const sequelize = new Sequelize('first', 'root', 'Velupvm1618@', {

  host: 'localhost',
  dialect: 'mysql',

});

// Define a model

const User = sequelize.define('user', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  age: DataTypes.INTEGER,
},{freezeTableName:true,
  timestamps:false
});

// Ensure table is created

app.use('/uploads', express.static('uploads'));
sequelize.sync();
 
const storage = multer.diskStorage({
    
  destination:path.join(__dirname , '/uploads'), // Always resolves correctly
  
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Storage Config

const upload = multer({ storage: storage });

// Upload route

app.post('/upload', upload.single('csvfile'), async (req, res) => {
  const results = [];

  if(!req.file?.path)
    {
    res.status(404).json("No CSV found")
  }
  
  fs.createReadStream(req.file.path , "utf-8")
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
      try{
       const data = await User.bulkCreate(results);
        res.send('CSV data uploaded and saved to database.', data);
      }
       catch (err) {
        console.error(err) ;
        res.status(400).send('Error saving data.');
      } 
    });
});

// Basic HTML upload form

app.get('/', (req, res) => {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="csv" accept=".csv" />
      <button type="submit">Upload CSV</button>
    </form>
  `);
});

// Start server

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
