import User from "../schema/userSchema.js";
import bcrypt from "bcrypt";

// Create
export const createUser = async (userobj) => {
  try {
    const { email, password, name } = userobj;
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkMatchingUser = await User.findOne({ email });
    if (checkMatchingUser) {
      return "User already exists";
    }

    const result = await User.create({ ...userobj, password: hashedPassword });
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const authenticateUser = async (userobj) => {
  try {
    const { email, password } = userobj;

    const checkMatchingUser = await User.findOne({ email });
    if (checkMatchingUser) {
      const hashedPassword = checkMatchingUser.password;

      const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
      if (!isPasswordMatch) {
        return false;
      }
      if (isPasswordMatch) {
        return true;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
