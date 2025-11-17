const bcrypt = require("bycryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.models.js");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message:
          "El Correo ya esta registrado en nuestro sistema! Por favor intente de nuevo",
      });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "Nuevo Usuario Creado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Ocurrio Algun Error" });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "El usuario no existe! Registrese por favor",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "La Clave Ingresada es Incorrecta!! Intente de Nuevo",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' }).json({
      success: true,
      message: "Inicio de Sesion Exitoso",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName : checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Ocurrio Algun Error" });
  }
};

//logout

const logOutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Sesion Cerrada Correctamente",
  });
};

//auth middelware

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Usuario no Autorizado!!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Usuario no Autorizado!!",
    });
  }
};

module.exports = { registerUser, loginUser, logOutUser, authMiddleware };
