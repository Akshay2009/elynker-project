const db = require("../models");
const { Op, DataTypes, Sequelize } = require("sequelize");
const Certificate = db.certificate;
//creating certificate---

module.exports.createCertificate = async function (req, res) {
  try {
    const {
      email,
      name,
      mobile_no,
      otp,
      created_by,
      modified_by,
      registrationId,
    } = req.body;
    const newCertificate = await Certificate.create({
      email,
      name,
      mobile_no,
      otp,
      created_by,
      modified_by,
      registrationId,
    });
    res.status(201).json({
      message: "Certificate created successfully",
      newCertificate,
    });
  } catch (error) {
    console.error("Error creating Certificate:", error);
    res.status(500).json({ error: "Failed to create Certificate" });
  }
};

///getting certificate data--

module.exports.getCertificate = async function (req, res) {
  try {
    const certificate = await Certificate.findAll({});
    if (certificate) {
      res.status(200).json(certificate);
    } else {
      res.status(404).json({ error: "No certificate Returned" });
    }
  } catch (err) {
    console.error("Error fetching certificate", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//getting data by id--

module.exports.getCertificateById = async function (req, res) {
  try {
    const { reg_id } = req.params;
    const CertificateDetails = await Certificate.findOne({
      where: { registrationId: reg_id },
    });

    if (CertificateDetails) {
      res.status(200).json(CertificateDetails);
    } else {
      res.status(404).json({ error: "Details not found" });
    }
  } catch (error) {
    console.error("Error getting by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error. Error:" + error.message });
  }
};
//putting data as per id--
module.exports.updateCertificateById = async function (req, res) {
  try {
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
    res.status(200).json({
      message: "Certificate record updated successfully",
      updatedCertificateRecord: existingCertificateRecord.toJSON(),
    });
  } catch (error) {
    console.error("Error updating certificate details:", error);
    res.status(500).json({ error: "Failed to update certificate record" });
  }
};
