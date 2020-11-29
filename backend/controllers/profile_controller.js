const uuid = require('uuid');
const getStream = require('into-stream');
const {BlobServiceClient} = require('@azure/storage-blob');
const {storage} = require('../config/config');

//delete the existing avatar (if exists) and store the new avatar
exports.updateAvatar = async (req, res, next) => {
    try{
        const blobName = uuid.v4() + '.jpg';
        //split the image data header
        const imgBase64 = req.body.image.split(';base64,').pop();
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

        const imageURL = `https://${storage.storageAccount}/${storage.avatarContainer}/${blobName}`

        const response = {msg: "image upload succeeded",
                          url: imageURL}

        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}