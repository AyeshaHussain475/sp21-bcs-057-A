const User = require("../models/user");
const jwt = require("jsonwebtoken");

//attached the function with export

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      return res.status(201).json({
        message: "User created successfully",
        //  user: savedUser,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong while saving the user",
      });
    }
  } catch (error) {
    console.error("Error during user creation:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (res.status === 400) {
      return res.json({
        message: "Something went wrong",
      });
    }

    if (existingUser) {
      if (existingUser.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: existingUser._id },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        const { _id, firstName, lastName, email, role, fullName } =
          existingUser;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).josn({
          message: "Invalid Password",
        });
      }
    }
  } catch (error) {
    console.error("Error during user creation:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// exports.requireSigin = (req, res, next) => {
//   console.log(req.headers.authorization);
//   next();
// };
