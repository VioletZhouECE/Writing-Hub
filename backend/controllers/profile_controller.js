const {storage} = require('../config/config');
const {BlobServiceClient} = require('@azure/storage-blob');

//delete the existing avatar (if exists) and store the new avatar
exports.updateAvatar = async (req, res, next) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(storage.connectionString);
    const containerClient = blobServiceClient.getContainerClient(storage.avatarContainer);

    const response = {msg: "image upload succeeded"}
    res.status(200).json(response);
}

//delete the existing avatar (if exists)
exports.deleteAvatar = async (req, res, next) => {
    res.status(200).send();
}