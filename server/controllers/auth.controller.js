import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "./../../config/config";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user)
      return res.status("401").json({
        error: "User not found",
      });

    if (!user.authenticate(req.body.password)) {
      return res.status("401").send({
        error: "Email and password don't match.",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      config.jwtSecret
    );

    res.cookie("t", token, {
      expire: new Date() + 9999,
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status("401").json({
      error: "Could not sign in",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile &&
    req.auth &&
    (req.profile._id == req.auth._id || req.auth.role == "admin");

  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

const permit = (...permittedRoles) => {
  return (req, res, next) => {
    if (req.auth && permittedRoles.includes(req.auth.role)) {
      next();
    } else {
      return res.status("403").json({
        error: "User is not authorized",
      });
    }
  };
};

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  permit,
};
