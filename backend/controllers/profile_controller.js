const uuid = require('uuid');
const {storage} = require('../config/config');
const azure = require('azure-storage');

//delete the existing avatar (if exists) and store the new avatar
exports.updateAvatar = async (req, res, next) => {
    try{
        var blobService = azure.createBlobService();
        const blobName = uuid.v4();
        await blobService.createBlockBlobFromText(storage.avatarContainer, 
            blobName,
            req.body.image,
            {contentType: 'image/jpeg', contentEncoding: 'base64'}, 
            (error, result, response) => {
                if (error) {
                throw (error);
                }
                console.log("result", result);
                console.log("response", response);
            });

        const response = {msg: "image upload succeeded"}
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}