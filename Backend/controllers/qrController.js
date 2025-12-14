const QRPass = require("../models/QRPass");
const { generateQR } = require("../services/qrService");

exports.createQR = async (req, res) => {
  const { visitorName, visitorPhone, validFrom, validTo } = req.body;

  const qrPass = await QRPass.create({
    residentId: req.user.id,
    visitorName,
    visitorPhone,
    validFrom,
    validTo
  });

  const qrData = {
    qrId: qrPass._id
  };

  const qrImage = await generateQR(qrData);

  res.json({
    qrId: qrPass._id,
    qrImage
  });
};
