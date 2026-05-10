import AppError from "../../ErrorHandler/appErrors";
import { IUser } from "./user.interface";
import { Users } from "./user.model";
import httpStatus from "http-status-codes"
import becryptjs from "bcryptjs"
import { envVars } from "../../config/env";


const addUser = async (payload: Partial<IUser>) => {

  const { email, password, ...rest } = payload;
  // console.log("addUserPayload",payload)

  const exceedUser = await Users.findOne({ email })

  if (exceedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exceed")
  }

  const hashedPassword = await becryptjs.hash(password as string, Number(envVars.becrypt_salt_round))

  const addUser = await Users.create({
    email,
    password: hashedPassword,
    ...rest
  })

  return addUser

}

// update your profile 
const updateProfile = async (payload: Partial<IUser>, decodedUser: any) => {

  const userId = decodedUser.userId
  const updateInfo = payload;
  console.log("updateUserPayload", payload, decodedUser)

  //   clg result: updateUserPayload { name: 'Umme Nahida' } {
  //   userId: '688cf31c5bd9bffaaeef3e70',
  //   email: 'niha@gmail.com',
  //   role: 'RIDER',
  //   iat: 1756568217,
  //   exp: 1756654617
  // }

  const addUser = await Users.findByIdAndUpdate(
    userId,
    updateInfo,
    { new: true }
  )

  return addUser

}


// -------get All user by admin
const allUsers = async (query: any) => {
  const { searchTerm, isApproved, isActive, role } = query;

  console.log("query", query)
  let filter: any = {};

  if (searchTerm) {
    filter.name = { $regex: searchTerm || "", $options: "i" }
  }

  if (isApproved) {
    filter.isApproved = isApproved === "true"
  }
  if (isActive) {
    filter.isActive = isActive
  }
  if (role) {
    filter.role = role
  }
  const users = await Users.find(filter).sort({ createdAt: -1 });

  return users

}

const blockUser = async (userId: string) => {
  const user = await Users.findByIdAndUpdate(
    userId,
    { isActive: "BLOCKED", isApproved: false, isBlocked: true },
    { new: true }
  );

  if (!user) {
    throw new AppError(404, "User not found")
  }

  return user;

}

const unblockUser = async (userId: string) => {
  const user = await Users.findByIdAndUpdate(
    userId,
    { isActive: "ACTIVE", isApproved: true, isVerified: true, isBlocked: false },
    { new: true }
  );

  if (!user) {
    throw new AppError(404, "User not found")
  }

  return user;

}


export const userService = {
  addUser,
  updateProfile,
  allUsers,
  blockUser,
  unblockUser
}