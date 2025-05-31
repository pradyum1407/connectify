import express from "express"
import { login, logout, signup ,onBoarding} from "../Controller/auth.controller.js"
import { protectedRoute } from "../middleware/auth.middleware.js"

const router=  express.Router()


router.post("/login",login )
router.post("/signup",signup)
router.post("/logout",logout)

router.post("/onboarding",protectedRoute,onBoarding)

router.get("/me",protectedRoute,(req,res)=>{
res.status(200).json({success:true, user:req.user})
})
export default router;