import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;



    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User already exists",
      });
      return;
    }


    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

   

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

   

    const token = generateToken(user.id);

  

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

  

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

  

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

  

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

  

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};