import express from "express";
import { DataTypes, Sequelize } from "sequelize";
import { z } from "zod" ;

const port = 3000;
const app = express();

export const connect = new Sequelize("first","root","Velupvm1618@",{
  host: "localhost",
  dialect: "mysql",
});

interface User {
  name: string ;
  age: number ;
  tech: string ;
  Empid: number ;
}

const table = connect.define("table2", {
  name: {
    type: DataTypes.STRING,
  },

  age: {
    type: DataTypes.INTEGER,
  },
  tech: {
    type: DataTypes.STRING,
  },
  Empid: {
    type: DataTypes.INTEGER,
  },
});

(async () => {
  try {
    await connect.sync();
    console.log("your database created");
  } catch (err: any) {
    console.log(err.message);
  }
})();

const US = z.object({
  name: z.string().nonempty(),
  age: z.number(),
  tech: z.string().nonempty(),
  Empid: z.number().nonnegative(),
});

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const requestuserdata = US.parse(req.body);
    const { name, age, tech, Empid } = requestuserdata as User;
    const responseuserdata = await table.create({ name, age, tech, Empid });
    res.status(200).json("data Created");
  } catch (err: any) {
    res.status(404).json(err.messag);
  }
});

app.listen(port, () => {
  console.log("Server Is Stared");
});
