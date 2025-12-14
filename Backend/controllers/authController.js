const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Guard = require("../models/Guard");

exports.guardLogin = async (req, res) => {
  const { username, password } = req.body;

  const guard = await Guard.findOne({ username });
  if (!guard) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, guard.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: guard._id, role: guard.role },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.json({
    token,
    role: guard.role,
    guardId: guard._id
  });
};
