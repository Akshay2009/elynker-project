const db = require('../models');
const Certificate = db.certificate;
const Registration = db.registration;

// creating certificate---
module.exports.createCertificate = async function(req, res) {
  const {
    name,
    description,
    issued_on,
    registrationId,
  } = req.body;
  const regRecord = await Registration.findByPk(registrationId);
  if (!regRecord) {
    return res.status(404).json({ error: 'Registration not found with this id' });
  }
  const newCertificate = await Certificate.create({
    name,
    description,
    issued_on,
    registrationId,
  });
  if (newCertificate) {
    return res.status(200).json({
      message: 'Certificate created successfully',
      data: newCertificate,
    });
  } else {
    return res.status(400).json({ error: 'No Record created' });
  }
};

// /getting certificate data--

module.exports.getCertificate = async function(req, res) {
  const certificate = await Certificate.findAll({});
  if (certificate.length>0) {
    return res.status(200).json({ message: 'Existing Certificate Records', data: certificate });
  } else {
    return res.status(404).json({ error: 'No certificate Returned' });
  }
};

// getting data by id--

module.exports.getCertificateById = async function(req, res) {
  const { reg_id } = req.params;
  const CertificateDetails = await Certificate.findAll({
    where: { registrationId: reg_id },
  });

  if (CertificateDetails) {
    return res.status(200).json({ message: 'Existing Certificate Records', data: CertificateDetails });
  } else {
    return res.status(404).json({ error: 'Details not found' });
  }
};
// putting data as per id--
module.exports.updateCertificateById = async function(req, res) {
  const certificate_id = req.params.certificate_id;
  const {
    name,
    description,
    issued_on,
    registrationId,
  } = req.body;
  const regRecord = await Registration.findByPk(registrationId);
  if (!regRecord) {
    return res.status(404).json({ ërror: 'Registration not found with this id' });
  }

  const [row, updatedRecord]=await Certificate.update({
    name,
    description,
    issued_on,
    registrationId,
  }, {
    where: {
      id: certificate_id,
    },
    returning: true,
  });
  if (row>0) {
    return res.status(200).json({
      message: 'Certificate record updated successfully',
      data: updatedRecord[0],
    });
  } else {
    return res.status(404).json({ error: 'Certificate not found with this id' });
  }
};


/**
 * Controller function to Delete certificate details by Id-
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delCertificate = async function(req, res) {
  const { certificate_id } = req.params;
  const certificateToDelete = await Certificate.findByPk(certificate_id);
  const delCertificate = await Certificate.destroy({
    where: { id: certificate_id },
    returning: true,
    raw: true,
  });
  if (delCertificate > 0) {
    return res.status(200).json({ message: 'certificate deleted successfully', data: certificateToDelete });
  } else {
    return res.status(404).json({ error: 'certificate not found' });
  }
};

/**
 * Search Cerificate details by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.search = async function(req, res) {
  try {
    const { fieldName, fieldValue }= req.params;
    if (!Certificate.rawAttributes[fieldName]) {
      return res.status(400).json({ error: 'Invalid field name' });
    }
    const records = await Certificate.findAll({
      where: {
        [fieldName]: fieldValue,
      },
    });
    if (records.length>0) {
      return res.status(200).json({ message: 'Fetched Records', data: records });
    } else {
      return res.status(404).json({ error: 'No record found' });
    }
  } catch (err) {
    if (err instanceof Sequelize.Error) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
