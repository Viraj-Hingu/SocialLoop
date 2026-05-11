const authModel = require("../model/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  };
};

const handleRegister = async (req, res) => {
  try {
    const { username, email, password, bio, profilePicture } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "username, email and password are required",
      });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Server configuration error: JWT_SECRET is missing",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const findUser = await authModel.findOne({
      $or: [{ username }, { email }],
    });

    if (findUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const user = await authModel.create({
      username,
      email,
      password: hash,
      bio,
      profilePicture,
    });
    const Token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("Token", Token, getCookieOptions());

    return res.status(201).json({
      message: "Registration Done...",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to register right now",
      error: error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "username/email and password are required",
      });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Server configuration error: JWT_SECRET is missing",
      });
    }

    const findUser = await authModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .select("+password");

    if (!findUser || !findUser.password) {
      return res.status(409).json({
        message: "Invalid user",
      });
    }

    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const Token = jwt.sign(
      {
        id: findUser._id,
        username: findUser.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("Token", Token, getCookieOptions());

    return res.status(200).json({
      message: "Logined",
      user: {
        id: findUser._id,
        username: findUser.username,
        email: findUser.email,
      },
      Token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to login right now",
      error: error.message,
    });
  }
};
module.exports = { handleRegister, handleLogin };
