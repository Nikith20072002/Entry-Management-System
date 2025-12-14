const QRCode = require("qrcode");

exports.generateQR = async (payload) => {
  return await QRCode.toDataURL(JSON.stringify(payload));
};
