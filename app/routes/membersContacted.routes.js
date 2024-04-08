const { authJwt } = require('../middleware');
const MembersContacted = require('../controllers/membersCount.controller');


module.exports = function (app) {
    /**
 * Endpoint to save members contacts 
 * @param {String} '/api/save/members/contacts' - API endpoint path.
 * @param {Function[]} [authJwt.verifyToken,
 * @param {Function} MembersContacted, - Controller function to get filter vendors details**/

    app.post(
        '/api/save/membersContacted/',
        [authJwt.verifyToken],
        MembersContacted.saveOrUpdateMembersCount,
    );

}