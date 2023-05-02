const router = require('express').Router();
const userRouter = require('../controller/userController')
const multer = require('multer')
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({storage:storage})

// const upload = multer({ dest: 'uploads/' })
// const registerUpload = upload.fields([
//   { name: 'uploadDocument1', maxCount: 1 },
//   { name: 'uploadDocument2', maxCount: 1 }
// ])
// router.post("/addUser", registerUpload, userRouter.addUser)
router.post("/addUser", upload.array('uploadDocument1',4), userRouter.addUser)
router.get("/listuser", userRouter.listuser)
router.get("/getOneUser/:id", userRouter.getOneUser)
router.delete("/userDelete/:id", userRouter.userDelete)
router.put("/updateuserField/:id", userRouter.updateuserField)





module.exports = router