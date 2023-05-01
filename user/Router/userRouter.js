const router = require('express').Router();
const userRouter = require('../controller/userController')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const registerUpload = upload.fields([
  { name: 'uploadDocument1', maxCount: 1 },
  { name: 'uploadDocument2', maxCount: 1 }
])
router.post("/addUser", registerUpload, userRouter.addUser)
router.get("/listuser", userRouter.listuser)
router.get("/getOneUser/:id", userRouter.getOneUser)
router.delete("/userDelete/:id", userRouter.userDelete)
router.put("/updateuserField/:id", userRouter.updateuserField)





module.exports = router