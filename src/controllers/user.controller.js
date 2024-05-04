import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler( async (req, res) => {
  // res.status(200).json({
  //   message: "Sucessfully Tested ThunderClient"
  // })

  /* Logic Building To register a user--

    1. get details from frontend
    2. validate all the fields
    3. check if user exists -- if so than error
    4. handle avatar and coverimage
    5. upload cloudinary
    6. create user in mongodb
    7. remove password and refreshtoken field from response
    8. check user created or not
    9. return response

  */

    const { fullName, username, email , password } = req.body

    console.log(email);
    console.log(username);
    console.log(password);
    console.log(fullName);

    // if(fullName === ""){
    //   throw new ApiError(400, "Full Name is Empty")
    // }

    if([fullName, username, email, password].some((field)=> field?.trim() === "" )){
      throw new ApiError(400, "All Fields Required")
    }

    if(existedUser){
      throw new ApiError(409, "User Already Exists. Please login")
    }

    const avatarLocalPath = req.file?.avatar[0]?.path;

    const coverImageLocalPath = req.file?.coverImage[0]?.path;

    if(!avatarLocalPath){
      throw new ApiError(400, "Avatar File Required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
      throw new ApiError(400, "Avatar File required")
    }

    const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    // console.log(createdUser)

    if(!createdUser){
      throw new ApiError(500, "Unable to create user. Please try again after sometime")
    }

    return res.status(201).json(
      new ApiResponse(200, createdUser, " User Registered Successfully")
    )

})


export { registerUser }