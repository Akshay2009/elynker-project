const db = require("../models");
const fs = require('fs');
const path = require('path');
const COMPANY_LOGO_PATH = path.join('/uploads/company/company_logo');

const Registration = db.registration;


module.exports.updateCompanyLogo = async function(req,res){
    if(req.userId){
        try{
            let registration =  await Registration.findByPk(req.params.id);
            if(req.file){
                if (registration.image_path){                   
                    fs.unlinkSync(path.join(__dirname, '..', registration.image_path));
                }
                registration.image_path = COMPANY_LOGO_PATH+'/'+req.file.filename;
            }
            await registration.save();
            res.redirect('back');
        }catch(err){
            res.status(500).json({error : 'error in updating company logo'})
        }
    }else{
        res.status(401).json({error : 'Unauthorized'});
    }
}