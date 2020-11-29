const uuid = require('uuid');
const getStream = require('into-stream');
const {storage} = require('../config/config');
const {BlobServiceClient} = require('@azure/storage-blob');

//delete the existing avatar (if exists) and store the new avatar
exports.updateAvatar = async (req, res, next) => {
    try{
        if(!req.file){
            throw new Error("Empty profile image");
        }
        const blobName = uuid.v4() + '_' + req.file.originalname;
        const stream = getStream(req.file.buffer);
        const blobServiceClient = BlobServiceClient.fromConnectionString(storage.connectionString);
        const containerClient = blobServiceClient.getContainerClient(storage.avatarContainer);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadStream(stream,
            uploadOptions.bufferSize, uploadOptions.maxBuffers,
            { blobHTTPHeaders: { blobContentType: "image/jpeg" } });

        const response = {msg: "image upload succeeded"}
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}