import bcrypt from "bcrypt";
import { UserModel } from '../models/UserModel';
import config from "../config/config";
import jwt from 'jsonwebtoken';

interface User {
  username: string
  password: string
}

export const authService = {

  async register(data:User) {

    const { username, password } = data;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw new Error('user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      password: hashedPassword,
    })

    return {
      id: user._id,
      username: user.username,
    }
  },

  async login(data:User) {

    const { username, password } = data;

    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error('user or password incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('user or password incorrect');
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    return {
      id: user._id,
      username: user.username,
      token,
    }
  },

  async changePassword(data: { username: string, oldPassword: string, newPassword: string }) {

    const { username, oldPassword, newPassword } = data;

    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error('user or password incorrect');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('user or password incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return {
      id: user._id,
      username: user.username,
    }
  }

}