import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User created successfully", user: { id: newUser.id, username, email } });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Email or username already exists." });
    }
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ message: "Invalid credentials!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to log in." });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful." });
};

export const clerkLogin = async (req, res) => {
  try {
    const { sessionId, userId } = req.auth;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const clerkUser = await clerkClient.users.getUser(userId);

    let user = await prisma.user.findUnique({ where: { email: clerkUser.emailAddresses[0].emailAddress } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: clerkUser.username || clerkUser.firstName,
          email: clerkUser.emailAddresses[0].emailAddress,
          password: "",
        },
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to log in with Clerk." });
  }
};
