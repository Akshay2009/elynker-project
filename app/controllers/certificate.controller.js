const db = require('../models');
const Certificate = db.certificate;
const Registration = db.registration;
const serviceResponse = require('../config/serviceResponse');

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
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.registrationNotFound });
  }
  const newCertificate = await Certificate.create({
    name,
    description,
    issued_on,
    registrationId,
  });
  if (newCertificate) {
    return res.status(serviceResponse.saveSuccess).json({
      message: serviceResponse.createdMessage,
      data: newCertificate,
    });
  } else {
    return res.status(serviceResponse.badRequest).json({ error: serviceResponse.errorCreatingRecord });
  }
};

// /getting certificate data--

module.exports.getCertificate = async function(req, res) {
  try {
    const maxLimit = 50;
    let { page, pageSize } = req.query;
    page = page ? page : 1;
    let offset = 0;
    if (page && pageSize) {
      pageSize = pageSize <= maxLimit ? pageSize : maxLimit;
      offset = (page - 1) * pageSize;
    }

    const { count, rows } = await Certificate.findAndCountAll({
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'ASC']],
    });
    if (count > 0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, totalRecords: count, data: rows });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};


// getting data by id--

module.exports.getCertificateById = async function(req, res) {
  const { reg_id } = req.params;
  const CertificateDetails = await Certificate.findAll({
    where: { registrationId: reg_id },
  });

  if (CertificateDetails) {
    return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: CertificateDetails });
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
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
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.registrationNotFound });
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
    return res.status(serviceResponse.ok).json({
      message: serviceResponse.updatedMessage,
      data: updatedRecord[0],
    });
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
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
  if(!certificateToDelete) {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
  const delCertificate = await Certificate.destroy({
    where: { id: certificate_id },
    returning: true,
    raw: true,
  });
  if (delCertificate > 0) {
    return res.status(serviceResponse.ok).json({ message: serviceResponse.deletedMessage, data: certificateToDelete });
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
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
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
    }
    const records = await Certificate.findAll({
      where: {
        [fieldName]: fieldValue,
      },
    });
    if (records.length>0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: records });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    if (err instanceof Sequelize.Error) {
      return res.status(serviceResponse.badRequest).json({ error: err.message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};
