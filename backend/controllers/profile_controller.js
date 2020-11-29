const {storage} = require('../config/config');
const {BlobServiceClient} = require('@azure/storage-blob');

exports.updateAvatar = async (req, res, next) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(storage.connectionString);
    const containerClient = blobServiceClient.getContainerClient('avatar');
    res.status(200).send();
}

exports.deleteAvatar = async (req, res, next) => {
    res.status(200).send();
}