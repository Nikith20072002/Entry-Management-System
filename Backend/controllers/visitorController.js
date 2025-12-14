const Otp = require("../models/Otp");
const Resident = require("../models/Resident");
const { generateOtp, hashOtp } = require("../utils/otp");
const notificationService = require("../services/notificationService");

exports.createVisitor = async (req, res) => {
  const { name, phone, vehicleNo, residentId, guardId, photoUrl } = req.body;

  const visitor = await Visitor.create({ name, phone, vehicleNo, photoUrl });

  const visit = await VisitLog.create({
    visitorId: visitor._id,
    residentId,
    guardId,
    entryTime: new Date(),
    approvalType: "OTP",
    status: "PENDING"
  });

  const otp = generateOtp();
  const otpHash = hashOtp(otp);

  await Otp.create({
    visitId: visit._id,
    residentId,
    otpHash,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 mins
  });

  const resident = await Resident.findById(residentId);
  await notificationService.sendOtp(resident.phone, otp);

  res.json({
    message: "Visitor logged, OTP sent to resident",
    visitId: visit._id
  });
};
