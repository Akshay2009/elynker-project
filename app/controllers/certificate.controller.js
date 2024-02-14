const db = require("../models");
const Certificate = db.certificate;

//creating certificate---
module.exports.createCertificate = async function (req, res) {
  const {
    email,
    name,
    mobile_no,
    otp,
    created_by,
    modified_by,
    registrationId,
  } = req.body;
  if (!registrationId) {
    return res.status(404).json({ ërror: "Registration id not found kindly provide correct registration id" })
  }
  const newCertificate = await Certificate.create({
    email,
    name,
    mobile_no,
    otp,
    created_by,
    modified_by,
    registrationId,
  });
  return res.status(200).json({
    message: "Certificate created successfully",
    newCertificate,
  });
};

///getting certificate data--

module.exports.getCertificate = async function (req, res) {
  const certificate = await Certificate.findAll({});
  if (certificate) {
    return res.status(200).json(certificate);
  } else {
    return res.status(404).json({ error: "No certificate Returned" });
  }
};

//getting data by id--

module.exports.getCertificateById = async function (req, res) {
  const { reg_id } = req.params;
  const CertificateDetails = await Certificate.findAll({
    where: { registrationId: reg_id },
  });

  if (CertificateDetails) {
    return res.status(200).json(CertificateDetails);
  } else {
    return res.status(404).json({ error: "Details not found" });
  }
};
//putting data as per id--
module.exports.updateCertificateById = async function (req, res) {
  const { certificate_id } = req.params;
  const {
    email,
    name,
    mobile_no,
    otp,
    created_by,
    modified_by,
    registrationId,
  } = req.body;
  if (!registrationId) {
    return res.status(404).json({ error: "Registration id not found kindly provide correct registration id" })
  }
  const existingCertificateRecord = await Certificate.findByPk(
    certificate_id
  );
  if (!existingCertificateRecord) {
    return res.status(404).json({ error: "Certificate not found" });
  }
  await existingCertificateRecord.update({
    email,
    name,
    mobile_no,
    otp,
    created_by,
    modified_by,
    registrationId,
  });
  return res.status(200).json({
    message: "Certificate record updated successfully",
    updatedCertificateRecord: existingCertificateRecord.toJSON(),
  });
};


/**
 * Controller function to Delete certificate details by Id-
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delCertificate = async function (req, res) {
  const { certificate_id } = req.params;
  const delCertificate = await Certificate.destroy({ where: { id: certificate_id } });
  if (delCertificate == 0) {
    return res.status(404).json({ error: "certificate not found" });
  }
  return res.status(200).json({ message: "certificate deleted successfully" });
};
