const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  console.log("TOKEN:", token); // 🔥 ADD THIS

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded); // 🔥 ADD THIS

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Invalid token" });
  }
};