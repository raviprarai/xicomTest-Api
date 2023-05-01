const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dscjjaxtk",
  api_key: "851373697286344",
  api_secret: "h0QdFRcrRRxGk2sbfJ8wfsjIh1Q",
});

module.exports = {
  uploadImage: async (image) => {
    try {
      let upload = await cloudinary.uploader.upload(image);
      return upload.secure_url;
    } catch (error) {
      return res.send({
        responseCode: 501,
        responseMessage: "Something went wrong !",
        responseResult: error.message,
      });
    }
  },
};
