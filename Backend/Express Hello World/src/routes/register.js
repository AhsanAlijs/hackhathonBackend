import express from "express"
import { login, register } from "../controllers/auth.js"
import { deleteUser, findUser, getData, updateUser } from "../controllers/getData.js"
import { verifyToken } from "../middleware/auths.js"
const router = express.Router()


// verifyToken

router.get("/", getData)

router.get("/findUser/:id", findUser)

router.post("/register", register)

router.post("/login", login)

router.delete("/deleteUser/:id", deleteUser)

router.put("/updateUser/:id", updateUser)








export default router