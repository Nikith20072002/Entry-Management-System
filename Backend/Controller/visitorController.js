const Visitor = require("../models/Visitor");
const VisitLog = require("../models/VisitLog");

exports.createVisitor = async (req, res) => {
  const { name, phone, vehicleNo, residentId, guardId, photoUrl } = req.body;

  const visitor = await Visitor.create({
    name, phone, vehicleNo, photoUrl
  });

  const visit = await VisitLog.create({
    visitorId: visitor._id,
    residentId,
    guardId,
    entryTime: new Date(),
    approvalType: "OTP"
  });

  res.json({ message: "Visitor logged", visit });
};
