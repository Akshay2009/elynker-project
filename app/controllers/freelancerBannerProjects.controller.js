const db = require("../models");
const FreelancerBannerProject = db.freelancerBannerProject;
const Registration = db.registration;
const path = require("path");
const fs = require("fs");
require('dotenv').config();
const USERS_BANNER_PATH = path.join(process.env.USERS_BANNER_PATH);



/**
 * Controller function to Create Records UsersBanner Table with provided registrationIds
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createUsersBanner = async function (req, res) {
    try {
        let registrationId = req.params.registrationId;
        const registrationRecord = await Registration.findByPk(registrationId);
        if(registrationRecord.registration_type !== 3){
            return res.status(404).json({error : 'Registration is not freelancer type'});
        }
        const { banner_name } = req.body;
        if(!banner_name){
            return res.status(400).json({error : 'Please Provide Banner Name'});
        }
        const bannerImages = req.files['images'];
        if (bannerImages && bannerImages.length > 0) {
            const userBanner = await FreelancerBannerProject.create({
                banner_name: banner_name,
                banner_image : bannerImages[0].filename,
                registrationId: registrationId
            });
            if(userBanner){
                return res.status(201).json({message : 'Banner Record Created',data : userBanner});
            }else{
                return res.status(400).json({error : 'Banner Record not created'});
            }
        }else{
            return res.status(400).json({error : 'Banner Image not provided'});
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' + err.message });
    }
}

/**
 * 
 * Controller function to update Record only banner_name and banner_image based on userBannerId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateUsersBanner = async function (req, res) {
    try {
        let userBannerId = req.params.userBannerId;
        let userBanner = await FreelancerBannerProject.findByPk(userBannerId);
        const { banner_name } = req.body;
        if(!banner_name){
            return res.status(400).json({error : 'Please Provide Banner Name'});
        }
        const bannerImages = req.files['images'];
        if (bannerImages && bannerImages.length > 0) {
            if(userBanner.banner_image){
              fs.unlinkSync(path.join(__dirname, '../..', USERS_BANNER_PATH,'/',userBanner.banner_image));
            }
            userBanner.banner_image = bannerImages[0].filename;
        }
        await userBanner.save();
        return res.status(200).json({message : "UserBanner Updated Successfully",data : userBanner});
        
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' + err.message });
    }
}

/**
 * Controller function to get UsersBanner record based on userBannerId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getUsersBannerById = async function (req, res) {
    try {
        let userBannerId = req.params.userBannerId;
        const bannerUserRecord = await FreelancerBannerProject.findOne({
            where: {
                id:userBannerId
            }
        });
        if(bannerUserRecord){
            return res.status(200).json(bannerUserRecord);
        }else{
            return res.status(400).json({ error: 'No UserBanner Record with id Present' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' + err.message });
    }
}

/**
 * Controller function to get all UsersBanner record based on registrationId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getUsersBannerByRegistrationId = async function (req, res) {
    try {
        let registrationId = req.params.registrationId;
        const bannerUserRecord = await FreelancerBannerProject.findAll({
            where: {
                registrationId:registrationId
            }
        });
        if(bannerUserRecord){
            return res.status(200).json({message:'UsersBanner Record with Registration Id',data:bannerUserRecord});
        }else{
            return res.status(400).json({ error: 'No UserBanner Record with id Present' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' + err.message });
    }
}

/**
 * Controller function to delete UsersBanner record based on userBannerId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.deleteUsersBanner = async function(req,res){
    try{
        const userBannerId = req.params.userBannerId;
        const userBannerToDelete = await FreelancerBannerProject.findOne({
            where: {
                id:userBannerId
            }
        });
        if (!userBannerToDelete) {
            return res.status(404).json({ error: 'No Product found' });
        }
        if(userBannerToDelete.banner_image){
            fs.unlinkSync(path.join(__dirname, '../..', USERS_BANNER_PATH,'/',userBannerToDelete.banner_image));
        }
        const deletedUserBanner = await FreelancerBannerProject.destroy({
            where: {
                id:userBannerId
            },
            returning: true,
            raw: true,
        });
        if (deletedUserBanner) {
            return res.status(200).json({ message: 'UserBanner Deleted Successfully', data: userBannerToDelete });
        } else {
            return res.status(401).json({ error: 'No UserBanner Deleted' });
        }

    }catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' + err.message });
    }
}
