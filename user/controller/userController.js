const userModel = require("../model/userModel");
const { uservalidation } = require("../../validators/allValidator");
const commonFunction = require("../../helper/commonFunction");

exports.addUser = async (req, res) => {
  try {
    const data = req.body;
    const { error } = uservalidation.validate(data);
    if (error) {
      return res.status(400).json(error.details[0].message);
    } else {
      const d = req.body.dob;
      var dob = new Date(d);
      var month_diff = Date.now() - dob.getTime();
      var age_dt = new Date(month_diff);
      var year = age_dt.getUTCFullYear();
      var age = Math.abs(year - 1970);
      console.log("Age of the date entered: " + age + " years");
      if (age <= 18) {
        return res.send({
          message: "Your Minimum age should be 18 years.",
        });
      }
      let result = await userModel.findOne({
        $and: [
          {
            $or: [{ email: req.body.email }, { firstName: req.body.firstName }],
          },
          { status: { $ne: "DELETE" } },
          { userType: "USER" },
        ],
      });
      if (result) {
        if (result.email == req.body.email) {
          return res.send({
            reponseCode: 409,
            responseMessage: "email already exists",
            result: [],
          });
        } else {
          if (result.firstName == req.body.firstName) {
            return res.send({
              reponseCode: 409,
              responseMessage: "firstName  already exists",
              result: [],
            });
          }
        }
      } else {
        // if (req.files.length != 0) {
        //   req.body.uploadDocument1 = await commonFunction.uploadImage(
        //     req.files.uploadDocument1[0].path
        //   );
        //   req.body.uploadDocument2 = await commonFunction.uploadImage(
        //     req.files.uploadDocument2[0].path
        //   );
        // }
        // req.body.uploadDocument1 = req.body.uploadDocument1;

        let image = [];
        for (let index = 0; index < req.files.length; index++) {
            let f = await commonFunction.uploadImage(req.files[index].path);
            image.push(f);
        }
        req.body.uploadDocument1=image;
        let userSave = await new userModel(req.body).save();
        if (userSave) {
          req.body.userId = userSave._id;
        //  else {
            let updateUser = await userModel.findByIdAndUpdate(
              { _id: userSave._id },
              { $set: req.body, age: dob },
              { new: true }
            );
            if (updateUser) {
              return res.send({
                reponseCode: 200,
                success: true,
                responseMessage: "Register successfully",
                result: updateUser,
              });
            }
            // }
          }
        }
    //   }
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ success: false, message: "Something went wrong" });
  }
};
exports.listuser = async (req, res) => {
  try {
    const data = await userModel.find();
    if (!data[0]) {
      return res.status(404).json({
        status: 0,
        message: "Data Not Found",
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "All List Founded",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
exports.getOneUser = async (req, res) => {
  try {
    const data = await userModel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: 0,
        message: "Id Not Found...",
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "User Found successfully..",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
exports.userDelete = async (req, res) => {
  try {
    const data = await userModel.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: 0,
        message: "Data Not Found..",
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "User Deleted Successfully..",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
exports.updateuserField = async (req, res) => {
  try {
    const data = req.body;
    const updated = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({
        status: 0,
        message: "Id Not Found....",
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "Update successfully.....",
        result: updated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
