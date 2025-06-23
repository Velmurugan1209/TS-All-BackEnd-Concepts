import {
  usercreatedata,
  userDestroyData,
  userGetData,
  userlistdata,
  userupdatedata,
} from "../controller/usercontroller";
import { Router } from "express";

export const UserRouter = Router();

UserRouter.post("/create", usercreatedata);
UserRouter.get("/userlist", userlistdata);
UserRouter.put("/:empid", userupdatedata);
UserRouter.delete('/:name', userDestroyData);
UserRouter.get('/:empid', userGetData);
