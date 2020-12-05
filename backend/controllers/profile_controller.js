const uuid = require('uuid');
const getStream = require('into-stream');
const {BlobServiceClient} = require('@azure/storage-blob');
const {storage} = require('../config/config');
const models = require('../models/index');

//delete the existing avatar (if exists) and store the new avatar
exports.updateAvatar = async (req, res, next) => {
    try{
        const imageData = req.body.image;
        if(!imageData){
            let err = new Error(`Empty image`);
            err.statusCode = 500;
            throw err;
        }

        //upload image to Azure blob
        const blobName = uuid.v4() + '.jpg';
        //split the image data header
        const imgBase64 = imageData.split(';base64,').pop();
        //decode base 64 string to buffer
        const buff = Buffer.from(imgBase64, 'base64');
        //convert buffer to stream
        const stream = getStream(buff);
        
        const blobServiceClient = BlobServiceClient.fromConnectionString(storage.connectionString);
        const containerClient = blobServiceClient.getContainerClient(storage.avatarContainer);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadStream(stream,
            undefined, undefined,
            { blobHTTPHeaders: { blobContentType: "image/jpg" } });

        //get the old image url from db and delete the old image from Azure blob
        const {avatarUrl} = await models.User.findOne({where: { id: req.userId }});
        if (avatarUrl){
            const filename = avatarUrl.split('/').pop();
            await containerClient.deleteBlob(filename);
        }

        const imageURL = `https://${storage.storageAccount}/${storage.avatarContainer}/${blobName}`
        
        //store avatarUrl to db
        await models.User.update(
            { avatarUrl: imageURL},
            { where: { id: req.userId } }
          )

        const response = {msg: "image upload succeeded",
                          url: imageURL}

        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}