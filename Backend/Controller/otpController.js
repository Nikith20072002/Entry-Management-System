const Otp = require("../models/Otp");
const VisitLog = require("../models/VisitLog");
const { hashOtp } = require("../utils/otp");

exports.verifyOtp = async (req, res) => {
  const { visitId, otp } = req.body;

  const otpRecord = await Otp.findOne({ visitId, verified: false });

  if (!otpRecord) {
    return res.status(404).json({ message: "OTP not found" });
  }

  if (otpRecord.expiresAt < new Date()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (hashOtp(otp) !== otpRecord.otpHash) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  otpRecord.verified = true;
  await otpRecord.save();

  await VisitLog.findByIdAndUpdate(visitId, {
    status: "APPROVED"
  });

  res.json({ message: "OTP verified, visitor approved" });
};
