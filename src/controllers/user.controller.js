import { asynchandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { apiresponse } from "../utils/apiresponse.js";
const registeruser = asynchandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  console.log("email:", email);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new apierror(400, "all fields are required");
  }
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new apierror(409, "user with email or username exist");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverimageLocalPath = req.files?.coverimage[0]?.path;

  if (!avatarLocalPath) {
    throw new apierror(400, "avatar file required");
  }
  const avatar = await uploadoncloudinary(avatarLocalPath);
  const coverimage = await uploadoncloudinary(coverimageLocalPath);
  if (!avatar) {
    throw new apierror(400, "avatar file required");
  }
 const user= await User.create({
    fullname,
    avatar: avatar.url,
    coverimage: coverimage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
 const createduser= await User.findById(user._id).select(
    "-password -refreshtoken"
 )
 if(!createduser){
    throw new apierror(500, "something went wrong while user registration")
 }
 return res.status(201).json(
    new apiresponse(200, createduser, "User registered succesfully")
 )
});

export { registeruser };
