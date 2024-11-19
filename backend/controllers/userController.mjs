import User from "../models/userModel.mjs";
import asyncHandler from "../middlewares/asyncHandler.mjs";
import createToken from "../utils/createToken.mjs";
import { createAccount, afterLogin, getSeedAndPrivateKey } from "../utils/userAccount.mjs";
import pinFileToIPFS from "../utils/pinataUploader.mjs";
import bcrypt from "bcrypt";
import fetch from "node-fetch"

const createUser = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, registrationType, bigRegistration, kvkNumber, practiceAddress, phone, password} = req.body;
  if (!email || !firstName || !lastName || !registrationType|| !bigRegistration|| !kvkNumber|| !practiceAddress|| !phone) {
    throw new Error("Fill the all inputs");
  }
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "email already exists" });

  const newUser = new User({ email, firstName, lastName, registrationType, bigRegistration, kvkNumber, practiceAddress, phone, password });
  
  try {
    await newUser.save();
    createToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      result: "successful"
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log("ok1")
    console.log(isPasswordValid)
    console.log(password)
    if (isPasswordValid) {
      // createToken(res, existingUser._id);
      console.log("ok2")
      // const account = afterLogin(existingUser.rootSeed, "1234", password);

      return res.status(200).json({
        _id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        // iv: account.iv,
        address: existingUser.email
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } else {
    return res.status(401).json({ message: "Invalid username" });
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0)
  });

  return res.status(200).json({ message: "Log out successful" });
});

const checkExistUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(200).json({ existUser: true });
  } else {
    return res.status(200).json({ existUser: false });
  }
});

const getAddressFromUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(200).json({ address: user.address, profileImage: user.profileImage });
  } else {
    return res.status(401).json({ message: "Invalid username" });
  }
});

const getPrivateKey = asyncHandler(async (req, res) => {
  const { encryptedSeed, salt, iv, option } = req.body;
  if (!encryptedSeed || !salt || !iv || !option) {
    throw new Error("Invalid request");
  }
  const { seed, privateKey } = getSeedAndPrivateKey(
    encryptedSeed, salt, iv, option
  )
  if (privateKey) {
    return res.status(200).json({ seed: seed, privateKey: privateKey });
  } else {
    return res.status(401).json({ message: "Invalid seed" })
  }
})

const getAllUsername = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    const userNameList = users.map((user) => {
      return {
        label: user.username,
        value: user.username,
      };
    });
    return res.status(200).json(userNameList);
  } else {
    return res.status(401).json({ message: "Invalid username" });
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  checkExistUser,
  getAddressFromUsername,
  getPrivateKey,
  getAllUsername
};
