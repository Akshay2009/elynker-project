
const db = require('../models');
const Sequelize = db.Sequelize;
const logErrorToFile = require('../logger');
const serviceResponse = require('../config/serviceResponse');
const Registration = db.registration;
const MembersContacted = db.membersContacted;

module.exports.saveOrUpdateMembersCount = async function(req, res) {
    try{
        const {  member_phone, created_by, updated_by, registrationId } = req.body;
        if(!member_phone || !registrationId){
            return res.status(serviceResponse.badRequest).json({ error: 'Phone number or Registration Id not provided'});
        }
        const registrationRecord = await Registration.findByPk(registrationId);
        if(!registrationRecord){
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.registrationNotFound });
        }

        const record = await MembersContacted.findOne({
            where: {
                member_phone: member_phone,
                registrationId: registrationId,
            }
        });
        if(record){
            record.setDataValue('updatedAt', new Date());
            await record.save();
            return res.status(serviceResponse.ok).json({ message: serviceResponse.updatedMessage, data: record });
        }else{
            console.log('at 31');
            const newRecord = await MembersContacted.create({
                member_phone: member_phone,
                created_by: created_by,
                updated_by: updated_by,
                registrationId: registrationId
            });
            if(newRecord){
                return res.status(serviceResponse.saveSuccess).json({ message: serviceResponse.createdMessage, data: newRecord });
            }else{
                return res.status(serviceResponse.errorCreatingRecord).json({ error: serviceResponse.errorCreatingRecord });
            }
        }
        
    } catch(err) {
        logErrorToFile.logErrorToFile(err, 'memberCount.controller', 'updateMembersCount');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message+' '+err.errors[0].message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};