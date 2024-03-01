const db = require('../models');
const Sociallinks = db.sociallinks;
const Registration = db.registration;
const socialMediaMaster = db.socialMediaMaster;
const { Op } = require('sequelize');
// creating certificate---

module.exports.bulkCreateSociallinks = async function(req, res) {
  const socialLinkArray = req.body;
  const registrationId = req.params.registrationId;
  if (socialLinkArray.length == 0) {
    return res.status(400).json({ error: 'Please provide data in array' });
  }
  if (!registrationId || registrationId === '') {
    return res.status(400).json({
      error:
        'registration id not found,kindly provide correct registration id',
    });
  }
  const regRecord = await Registration.findByPk(registrationId);
  if (!regRecord) {
    return res.status(404).json({
      error: 'Registration Record not found',
    });
  }
  const socialMediaIdArray = [...new Set(socialLinkArray.map((obj) => obj.socialmedia_id))];

  const socialMediaMasterRecord = await socialMediaMaster.findAll({
    where: {
      id: {
        [Op.in]: socialMediaIdArray,
      },
    },
  });

  if (socialMediaMasterRecord.length!=socialMediaIdArray.length) {
    return res.status(400).json({ error: 'Record not exist for provided socialmedia_id in json Array' });
  }


  const newSociallinks = socialLinkArray.map((item) => {
    return {
      ...item,
      registrationId: registrationId, // Add registrationId
    };
  });
  const result = await Sociallinks.bulkCreate(newSociallinks, {
    updateOnDuplicate: ['social_name', 'social_url', 'socialmedia_id'],
  });

  if (result) {
    return res.status(201).json({
      message: 'Sociallinks created successfully',
      data: result,
    });
  } else {
    return res.status(400).json({
      error: 'Error updating socialLinks..',
    });
  }
};

module.exports.createSociallinks = async function(req, res) {
  const { socialmedia_id, social_name, social_url, created_by, modified_by, registrationId } =
    req.body;
  const socialMediaMasterRecord = await socialMediaMaster.findByPk(socialmedia_id);
  if (!socialMediaMasterRecord) {
    return res.status(404).json({
      error:
        'No Social Media Master Found with provided socialmedia_id',
    });
  }
  if (!registrationId || registrationId === '') {
    return res.status(404).json({
      error:
        'registration id not found,kindly provide correct registration id',
    });
  }
  const regRecord = await Registration.findByPk(registrationId);
  if (!regRecord) {
    return res.status(404).json({
      error: 'This Registration  Doesnot exist with this registrationId',
    });
  }

  const newSociallinks = await Sociallinks.create({
    socialmedia_id,
    social_name,
    social_url,
    created_by,
    modified_by,
    registrationId,
  });
  if (newSociallinks) {
    return res.status(201).json({
      message: 'Sociallinks created successfully',
      data: newSociallinks,
    });
  } else {
    return res.status(400).json({
      error: 'Sociallinks not created',
    });
  }
};

// /getting all sociallinks --
module.exports.getSociallinks = async function(req, res) {
  const sociallinks = await Sociallinks.findAll({});
  if (sociallinks.length>0) {
    return res.status(200).json(sociallinks);
  } else {
    return res.status(404).json({ error: 'No social links Returned' });
  }
};

module.exports.getSociallinksByRegistrationId = async function(req, res) {
  const registrationId = req.params.registrationId;
  const sociallinks = await Sociallinks.findAll({
    where: { registrationId: registrationId },
  });
  if (sociallinks.length > 0) {
    return res.status(200).json({ message: 'Social Links', data: sociallinks });
  } else {
    return res.status(404).json({ error: 'No social links with this Registration ID' });
  }
};

// /getting all sociallinks by id----
module.exports.getSociallinksById = async function(req, res) {
  const { social_id } = req.params;
  const SociallinksDetails = await Sociallinks.findOne({
    where: { id: social_id },
  });

  if (SociallinksDetails) {
    return res.status(200).json({ message: 'Social Links', data: SociallinksDetails });
  } else {
    return res.status(404).json({ error: 'Social Links Details not found' });
  }
};

// update social links by id--

module.exports.updateSociallinksById = async function(req, res) {
  const { social_id } = req.params;
  const { socialmedia_id, social_name, social_url, created_by, modified_by, registrationId } =
    req.body;
  const socialMediaMasterRecord = await socialMediaMaster.findByPk(socialmedia_id);
  if (!socialMediaMasterRecord) {
    return res.status(404).json({
      error:
        'No Social Media Master Found with provided socialmedia_id',
    });
  }
  if (!registrationId || registrationId === '') {
    return res.status(404).json({ error: 'registrationId  is not provided' });
  }
  const regRecord = await Registration.findByPk(registrationId);
  if (!regRecord) {
    return res.status(404).json({
      error: 'This Registration  Doesnot exist with this registrationId',
    });
  }
  
  const [rowUpdated, record]=await Sociallinks.update({
    socialmedia_id,
    social_name,
    social_url,
    created_by,
    modified_by,
    registrationId,
  }, {
    where: {
      id: social_id,
    },
    returning: true,
  });
  if (rowUpdated > 0) {
    return res.status(200).json({
      message: 'Social links record updated successfully',
      data: record[0],
    });
  }else{
    return res.status(404).json({ error: 'No SocialLink record found with this social_id' });
  }
};

/**
 * Controller function to Delete social links by id .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delSociallinksById = async function(req, res) {
  const { social_id } = req.params;
  const delSocialLink = await Sociallinks.destroy({
    where: { id: social_id },
  });
  if (delSocialLink === 0) {
    return res.status(404).json({ error: 'Social link not found' });
  }
  return res.status(200).json({ message: 'Social link deleted successfully' });
};

/**
 * Controller function to Delete all social links by registration Id .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delSociallinksByRegId = async function(req, res) {
  const { reg_id } = req.params;
  const delSocialLink = await Sociallinks.destroy({
    where: { registrationId: reg_id },
  });
  if (delSocialLink === 0) {
    return res.status(404).json({ error: 'No records found for provided regstration Id' });
  }
  return res.status(200).json({ message: ' Social link deleted successfully with Provided Registration Id' });
};


/**
 * Search SocialLinks details by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.search = async function(req, res) {
  try {
    const { fieldName, fieldValue } = req.params;
    if (!Sociallinks.rawAttributes[fieldName]) {
      return res.status(400).json({ error: 'Invalid field name' });
    }
    const records = await Sociallinks.findAll({
      where: {
        [fieldName]: fieldValue,
      },
    });
    if (records.length > 0) {
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
