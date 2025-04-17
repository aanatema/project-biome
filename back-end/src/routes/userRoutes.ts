// URL creating a new user
import express from "express"
import { createUser, loginUser, modifyUser } from '../controllers/userControllers'

const router = express.Router(); 

router.post("/new_user", createUser);
// LOGIC TO BE DONE IN THE CONTROLLER FILE
router.post("/login_user", loginUser);
router.post("/modify_user", modifyUser);

export default router;
