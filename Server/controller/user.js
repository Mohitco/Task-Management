const registerSchema = require("../Validate/loginValidation");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // Validate UserData
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    //Destructuring User Data
    const { username, email, password } = req.body;

    // Check If User Already register
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res
        .status(400)
        .json({ error: "Username or Email already Exist!" });

    // Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
    //Create newUSer
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({ message: "Register Sucessfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error! " });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check whether all the values present
    if (!email || !password)
      return res.status(400).json({ error: "All field are required" });
    //check user exist or not
    const checkUser = await User.findOne({ email });
    if (!checkUser) return res.status(400).json({ error: "User not Exist" });
    //Password Matching
    const matchPassword = await bcrypt.compare(password, checkUser.password);
    if (!matchPassword)
      return res.status(400).json({ error: "Password and User not matched" });
    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    if (!token) return res.status(400).json({ error: "Generating token!" });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Lax",
    });
    return res.status(200).json({ message: "Login Sucessfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error! " });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    return res.json({ message: "Logged Out" });
  } catch (error) {
    return res.json({ error: "Internal Server Error!" });
  }
};

const userDetails = async (req, res) => {
  try {
    const { user } = req;

    const getDetails = await User.findById(user._id)
      .populate("tasks")
      .select("-password");

    if (!getDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    const allTasks = getDetails.tasks;

    let yetToStart = [];
    let InProgress = [];
    let Completed = [];

    allTasks.forEach((item) => {
      if (item.status === "yetToStart") yetToStart.push(item);
      else if (item.status === "InProgress") InProgress.push(item);
      else Completed.push(item);
    });

    return res.status(200).json({
      success: true,
      tasks: { yetToStart, InProgress, Completed },
    });
  } catch (error) {
    console.error("Error in userDetails:", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};


module.exports = { register, login, logout, userDetails };
